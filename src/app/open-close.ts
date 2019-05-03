export class OpenClose {
  isMainOpen = true;
  isChildOpen = true;
  displaySybol = "↓";

  toggleMain() {
    this.isMainOpen = !this.isMainOpen;
    if(this.isMainOpen)
    {
      this.displaySybol = "↓";
    }
    else
    {
      this.displaySybol = "↑";
    }
    
  }


}