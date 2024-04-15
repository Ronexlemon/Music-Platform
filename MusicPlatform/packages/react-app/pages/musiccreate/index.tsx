import React, { ReactElement } from "react";
import type { NextPageWithLayout } from '../_app'
import LandLayout from "@/components/LandLayout";
import LandingPage from "@/components/pages/LandingPage";
import Layout from "@/components/Layout";
import ManagePage from "@/components/pages/ManageMusicPage";
import CreateForm from "@/components/pages/CreateMusicCoverPage";
import CreateLayout from "@/components/createLayout";

const Create = ()=>{
  return(
    <>
    <CreateForm/>
    </>
  )
}
export default Create;

Create.getLayout = function getLayout(page:ReactElement) {
  return (
    <CreateLayout>{page}</CreateLayout>
  )
}