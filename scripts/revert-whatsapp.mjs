import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env=Object.fromEntries(readFileSync(".env.local","utf8").split(/\r?\n/).filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return[l.slice(0,i),l.slice(i+1).replace(/^["']|["']$/g,"")]}));
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.SUPABASE_SERVICE_ROLE_KEY);
const RULES=[
  [/wa\.me\/27769770386/g,"wa.me/27601230000"],
  [/076 ?977 ?0386/g,"060 123 0000"],
  [/\bMBBCh\b/g,"MBBch"],                       // card reads MBBch (WITS)
];
const DRY=process.argv.includes("--dry");
for(const table of ["treatments","site_pages"]){
  const {data,error}=await sb.from(table).select("*");
  if(error){console.log("SKIP",table,error.message);continue;}
  for(const row of data??[]){
    const keyCol="id" in row?"id":"slug" in row?"slug":"key"; const id=row[keyCol];
    const patch={};
    for(const [k,v] of Object.entries(row)){
      if(v===null||typeof v==="number"||typeof v==="boolean")continue;
      const isStr=typeof v==="string", src=isStr?v:JSON.stringify(v);
      let out=src; for(const[re,to]of RULES) out=out.replace(re,to);
      if(out!==src) patch[k]=isStr?out:JSON.parse(out);
    }
    if(!Object.keys(patch).length)continue;
    console.log(`${DRY?"[dry] ":""}${table}/${id}: ${Object.keys(patch).join(", ")}`);
    if(!DRY){const{error:e2}=await sb.from(table).update(patch).eq(keyCol,id); if(e2)console.log("   !!",e2.message);}
  }
}
console.log("done");
