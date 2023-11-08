"use client"
import React, { Component } from "react";



export default class ToasterWithinput extends Component<{}> {
  constructor(props: any) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  close(){
    try {
      let b:any = document.getElementById("toasterBg1")
      b.style.display = "none"
    } catch (err) {
      console.log(err)
    }
  }

  showToast(msg: string, color: string, buttonFunction: (val:any) => void, buttonText: string) {
    try {
      let b:any = document.getElementById("toasterBg1")
      b.style.display = "block"
      let a: any = document.getElementsByClassName("toaster21")
      a[0].innerHTML = `<h1>${msg}</h1><input type="text" id="i-box" class="w-full rounded border border-black" placeholder="Enter The Amount"></input><button id="btn-action1" class="float-right mt-3 me-2 rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${buttonText}</button>`;
      const box = document.getElementById("i-box")
      let btn: any = document.getElementById("btn-action1")
      a[0].style.display = "block";
      a[0].style.color = color || "black"
      let val:any = 0
      box?.addEventListener("change",(e:any)=>{
        val = e.target.value
        console.log(val)
      })
      btn.addEventListener("click", () => {
        buttonFunction(val)
      b.style.display = "none"
        a[0].style.display = "none";
        a[0].style.color = "black"
      })

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div id="toasterBg1">
        <div className="toaster21">
        </div>
      </div>
    );
  }
}

export const toastinput = new ToasterWithinput(null);
