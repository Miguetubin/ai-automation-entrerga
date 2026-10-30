return $input.all().map((item,index)=>{
 const f=item.json.fields??{};
 const required=['Nombre del producto','SKU','Características','Público objetivo'];
 const missing=required.filter(k=>typeof f[k]!=='string'||!f[k].trim());
 if(typeof f.Precio!=='number'||!Number.isFinite(f.Precio)||f.Precio<0)missing.push('Precio numérico no negativo');
 if(!/^rec[a-zA-Z0-9]+$/.test(item.json.id??''))missing.push('ID de Airtable');
 return {json:{...item.json,validacion:missing.length?'error':'ok',detalle_error:missing.length?'Datos incompletos: '+missing.join(', '):''},pairedItem:{item:index}};
});