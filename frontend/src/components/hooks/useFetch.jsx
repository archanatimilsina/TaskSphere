import { useEffect,useState } from "react";

export default function useFetch(url)
{
const [data,setData]=useState(null);
const [loading, setLoading]=useState(true);
const [error, setError]=useState(null);

useEffect(()=>
{
let isMounted = true;
fetch(url)
.then((res)=>
{
    if(!res.ok)
    {
        throw new Error(`HTTP Error: ${res.status}`)
    }
    return res.json();
})
.then((json)=>
{
    if(isMounted){
        console.log(json);
        setData(json)}
}).catch(error=>
{
    if(isMounted)setError(error)
}
).finally(()=>
{
    if(isMounted)setLoading(false);
})
return ()=>
{
    isMounted=false;
}

},[url]);
return {data,loading,error};
}
