const API_BASE = "http://192.71.151.19:5050";

function codeToFlagEmoji(code){
  if(!code)return"🏳️";
  code=code.toUpperCase();
  return code.replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
}

async function loadInfo(){
  const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
  if(!tab||!tab.url)return;
  const host=new URL(tab.url).hostname;
  const r=await fetch(`${API_BASE}/ipinfo?host=${encodeURIComponent(host)}`);
  const d=await r.json();
  const cc=(d.country_code||"??").toUpperCase();
  const flag=codeToFlagEmoji(cc);
  const ip=d.ip||"n/a";
  document.getElementById("flag").textContent=flag;
  document.getElementById("title").textContent=`${flag} ${cc} — ${host}`;
  document.getElementById("meta").textContent=`${ip} — ${d.country_name||cc}`;
  document.getElementById("bgp-link").href=`https://bgp.tools/prefix/${encodeURIComponent(ip)}`;
  document.getElementById("copy-ip").onclick=()=>navigator.clipboard.writeText(ip);
  document.getElementById("run-mtr").onclick=async()=>{
    const o=document.getElementById("mtr-output");
    o.style.display="block";o.textContent="Running mtr...";
    const r=await fetch(`${API_BASE}/mtr?host=${encodeURIComponent(host)}`);
    const j=await r.json();o.textContent=j.stdout||j.error||"No output";
  };
}
document.addEventListener("DOMContentLoaded",loadInfo);
