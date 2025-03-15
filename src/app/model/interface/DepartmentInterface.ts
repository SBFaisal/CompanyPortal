export interface IApiResponse{
    message: string,
    result: boolean,
    data: any
}

export interface IParentDeparment{
    departmentId: number,
    departmentName: boolean,
    departmentLogo: string
}

export interface IChildDeparment{
    childDeptId: number,
    parentDeptId: number,
    departmentName: boolean
}



