var checkMove = 0;

export function moveDirectory() {
    if (checkMove === 0) {
      document.getElementById("mainHeader").style.marginLeft = "-380px";
      document.getElementById("mainHeader2").style.marginLeft = "-380px";
      document.getElementById("searchInput").style.marginLeft = "-380px";
      document.getElementById("addPlus").style.right = "112%";
      document.getElementById("confirm").style.left = "335px";
      document.getElementById("UL").style.marginLeft = "-380px";
      document.getElementById("UL2").style.marginLeft = "-380px";
      document.getElementById("clubs").style.marginLeft = "-380px";
      document.getElementById("clubs2").style.marginLeft = "-380px";
      document.getElementById("mover").style.marginLeft = "30px";
      document.getElementById("details").style.marginLeft = "-350px";
      document.getElementById("arrow").style.transform = "rotate(180deg)";
      checkMove = 1;
    } else {
      document.getElementById("mainHeader").style.marginLeft = "0px";
      document.getElementById("mainHeader2").style.marginLeft = "0px";
      document.getElementById("searchInput").style.marginLeft = "0px";
      document.getElementById("addPlus").style.right = "1.9%";
      document.getElementById("confirm").style.left = "685px";
      document.getElementById("clubs").style.marginLeft = "0px";
      document.getElementById("clubs2").style.marginLeft = "0px";
      document.getElementById("mover").style.marginLeft = "0px";
      document.getElementById("details").style.marginLeft = "0px";
      document.getElementById("arrow").style.transform = "rotate(0deg)";
      if (document.getElementById("clubs").className === "btn1 active" || document.getElementById("orgButtons").style.display === "inline") {
        document.getElementById("UL").style.width = "310px";
        document.getElementById("UL").style.marginLeft = "0px";
        document.getElementById("UL2").style.width = "0px";
        document.getElementById("UL2").style.marginLeft = "-100px";
    } else {
        document.getElementById("UL").style.width = "0px";
        document.getElementById("UL").style.marginLeft = "-100px";
        document.getElementById("UL2").style.width = "310px";
        document.getElementById("UL2").style.marginLeft = "0px";
    }
    checkMove = 0;
  }
}