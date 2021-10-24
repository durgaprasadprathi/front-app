export  const checkRoles = (permission: string, roles:any, section:string) => {
    let filter = roles.filter((r: any) => r.permissionName === permission + "_" + section)
    if (filter && filter.length > 0) {
        return true;
    }
    else
        return false;
}