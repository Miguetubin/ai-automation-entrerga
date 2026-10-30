return $input.all().map((item,index)=>{
 const producto=$('Validar producto').itemMatching(index).json;
 const raw=item.json;
 const texto=raw.output?.[0]?.content?.[0]?.text??raw.output_text??'';
 function extraer(seccion,siguiente){const inicio=texto.indexOf(seccion+':');if(inicio<0)return '';const desde=inicio+seccion.length+1;const fin=siguiente?texto.indexOf(siguiente+':',desde):texto.length;return texto.slice(desde,fin<0?texto.length:fin).replace(/\*\*/g,'').trim();}
 const result={titulo_generado:extraer('TITULO','DESCRIPCION'),descripcion_comercial:extraer('DESCRIPCION','BENEFICIOS'),beneficios:extraer('BENEFICIOS','PALABRAS_CLAVE'),palabras_clave:extraer('PALABRAS_CLAVE')};
 const errors=Object.entries(result).filter(([k,val])=>!val).map(([k])=>k+' vacío');
 if(result.titulo_generado.length>70)errors.push('Título mayor a 70 caracteres');
 if(raw.status==='incomplete')errors.push('Respuesta incompleta del modelo');
 return {json:{...producto,...result,airtable_record_id:producto.id,sku:producto.fields.SKU,nombre_producto:producto.fields['Nombre del producto'],estado_aprobacion:'Pendiente de aprobación',validacion_salida:errors.length?'error':'ok',detalle_error:errors.join('; '),tokens_entrada:raw.usage?.input_tokens??null,tokens_salida:raw.usage?.output_tokens??null},pairedItem:{item:index}};
});