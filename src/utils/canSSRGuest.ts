import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Router from "next/router";

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {


    if (typeof window !== "undefined") {
      const driveUser = localStorage.getItem("driverId");

      if (driveUser !== null && driveUser !== "") {
        Router.push("/dashboard");
        return { props: {} as P };
      }
    }

    return await fn(ctx);
  };
}





