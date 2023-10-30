import React, { Component } from "react";



export default class ToasterYesorNo extends Component<{}> {
  constructor(props: any) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  close(){
    try {
      let b:any = document.getElementById("toasterBg")
      b.style.display = "none"
    } catch (err) {
      console.log(err)
    }
  }

  showToast(msg: string, color: string, buttonFunction1: () => void) {
    try {
      let b:any = document.getElementById("toaster3")
      b.style.display = "block"
      let a: any = document.getElementsByClassName("toaster4")
      a[0].innerHTML = `<h1>${msg}</h1><button id="btn-action1" class="float-right mt-3 me-2 rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">No</button><button id="btn-action" class="float-right mt-3 me-2 rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Yes</button>`;
      let btn1: any = document.getElementById("btn-action")
      let btn2: any = document.getElementById("btn-action1")
      a[0].style.display = "block";
      a[0].style.color = color || "black"
      btn1.addEventListener("click", () => {
        buttonFunction1()
      b.style.display = "none"
        a[0].style.display = "none";
        a[0].style.color = "black"
      })
      btn2.addEventListener("click", () => {
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
      <div id="toaster3">
        <div className="toaster4">
        </div>
      </div>
    );
  }
}

export const toastOption = new ToasterYesorNo(null);
