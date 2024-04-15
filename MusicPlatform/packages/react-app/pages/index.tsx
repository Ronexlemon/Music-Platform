import React, { ReactElement } from "react";
import type { NextPageWithLayout } from './_app'
import LandLayout from "@/components/LandLayout";
import LandingPage from "@/components/pages/LandingPage";

const Landing = ()=>{
  return(
    <>
    <LandingPage/>
    </>
  )
}
export default Landing;

Landing.getLayout = function getLayout(page:ReactElement) {
  return (
    <LandLayout>{page}</LandLayout>
  )
}