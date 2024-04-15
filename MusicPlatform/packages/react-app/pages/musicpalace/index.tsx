import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import LandLayout from "@/components/LandLayout";
import LandingPage from "@/components/pages/LandingPage";
import Layout from "@/components/Layout";
import SportCenter from "@/components/pages/MusicPlatformPage";


const SportCenterPage = ()=>{
  return(
    <>
    <SportCenter/>
    </>
  )
}
export default SportCenterPage;

SportCenterPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}