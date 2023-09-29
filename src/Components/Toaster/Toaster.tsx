import React, { Component } from "react";

interface ToasterState {
  msg: string;
}

export default class Toaster extends Component<{}, ToasterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  showToast(msg: string,color:string) {
    try{

      let a:any = document.getElementsByClassName("toaster")
      a[0].innerHTML = msg;
      a[0].style.display = "block";
    a[0].style.color = color || "black"
    setTimeout(() => {
      try{

        a[0].style.display = "none";
        a[0].style.color = "black"
      }catch(err){
        console.log(err)
      }
    },5000)
  }catch(err){
    console.log(err)
  }
  }

  render() {
    return <div className="toaster"></div>;
  }
}

export const toast = new Toaster(null);
