const dev = process.env.NODE_ENV === "development"
const prod = process.env.NODE_ENV === "production"
const test = process.env.NODE_ENV === "test"

export async function appTitle() {
    const t = (dev && "Dev") || (test && "Test") || ""
    const title = "Traydn " +t
    return title
}

export async function adminMenus(){
    if(prod||test){
        return window.api.get("users","","id","==",window.auth.currentUser?.email)().then((f:any) => {
            console.log(f[0],"boom")
            return f[0].admin
        })
    } else {
        return Promise.resolve(true)
    }
}


export function getLid(){
    return window.auth.currentUser?.email || ""
}