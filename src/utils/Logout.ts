import  Router  from "next/router"


export function handleSignOutClient(){
    localStorage.removeItem('userId')
    Router.push('/#')
  }
export function handleSignOutDriver(){
    localStorage.removeItem('driverId')
    Router.push('/#')
  }