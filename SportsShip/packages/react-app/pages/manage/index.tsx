import React, { ReactElement } from "react";
import type { NextPageWithLayout } from '../_app'
import LandLayout from "@/components/LandLayout";
import LandingPage from "@/components/pages/LandingPage";
import Layout from "@/components/Layout";
import ManagePage from "@/components/pages/managepage";

const Manage = ()=>{
  return(
    <>
    <ManagePage/>
    </>
  )
}
export default Manage;

Manage.getLayout = function getLayout(page:ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}