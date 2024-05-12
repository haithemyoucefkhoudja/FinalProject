export const getURL = (end_point:string) =>{
    let url:string | undefined = undefined
    if(typeof window !== undefined)
        url = process.env.NEXT_PUBLIC_BACK_END_BASE_URL
    else 
        url = process.env.BACK_END_BASE_URL 

    if(!url)
        throw new Error('The back-end is not setted up')
    return url.concat(end_point);
} 