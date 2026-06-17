// ─────────────────────────────────────────────────────────────
// CALCULS  —  scores composites et chips
// ─────────────────────────────────────────────────────────────

function modeNote(h, col){
  if(col==='pve'){
    const stage=parseFloat(h[15]);
    const dr=parseFloat(h[13]);
    return (stage+dr)/2;
  }
  return parseFloat(h[col]);
}

function compositeScore(h, col){
  const parMult = PAR_MULT[gf(h[0],'parangon','')] || 0.10;
  const exV = parseInt(gf(h[0],'ex',0)) || 0;
  const exMult = EX_MULT[Math.min(exV, 15)];
  let base;
  if(col==='pve'){
    const stage=parseFloat(h[15]);
    const dr=parseFloat(h[13]);
    base=((5.0-stage)+(5.0-dr))/2;
  } else {
    const note=parseFloat(h[col]);
    base=5.0-note;
  }
  // Clamp base à 0 minimum (au cas où note > 5)
  base=Math.max(0,base);
  return base*parMult*exMult;
}

function exChip(h){
  const myEx=gf(h[0],'ex','');
  if(myEx==='') return `<span class="ex-chip ex-none">EX —</span>`;
  const v=parseInt(myEx);
  const cap10=parseInt(h[9]),cap15=parseInt(h[10]);
  const ok10=cap10<=0||(v>=cap10);
  const ok15=cap15<=0||(v>=cap15);
  const cls=ok10&&ok15?'ex-ok':ok10?'ex-mid':'ex-bad';
  return `<span class="ex-chip ${cls}">EX ${v}</span>`;
}
