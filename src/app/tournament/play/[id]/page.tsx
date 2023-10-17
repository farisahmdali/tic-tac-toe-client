import Player4 from "@/Components/tournament/Matchs";
import React from "react";

function Page({params}:{params:{id:string}}) {
  return <div><Player4 id={params.id}/></div>;
}

export default Page;
