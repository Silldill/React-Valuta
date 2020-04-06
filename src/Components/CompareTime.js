export default function CompareTime(ts)
{
    var date = new Date(ts)
    date.setHours(date.getHours() + 1)
    var date2 = new Date()
    console.log(date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US"))
    console.log(date2.toLocaleDateString("en-US") + " " + date2.toLocaleTimeString("en-US"))
    
    if(date > date2)
    return false

    return true
}