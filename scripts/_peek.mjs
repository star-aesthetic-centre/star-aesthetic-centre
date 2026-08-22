import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env=Object.fromEntries(readFileSync(".env.local","utf8").split(/\r?\n/).filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return[l.slice(0,i),l.slice(i+1).replace(/^["']|["']$/g,"")]}));
const sb=createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.SUPABASE_SERVICE_ROLE_KEY);
const {data}=await sb.from("site_pages").select("*").eq("slug","home");
const c=data?.[0]?.content ?? {};
console.log("top-level keys:",Object.keys(c).join(", "));
console.log("\ndoctorTrust:",JSON.stringify(c.doctorTrust??c.doctorCard??null,null,1));
