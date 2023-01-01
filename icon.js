export const ICON_MAP=new Map()

adddMapping([0,1],'sun')
adddMapping([2],'cloud-sun')
adddMapping([3],'cloud')
adddMapping([45,48],'smog')
adddMapping([51,53,55,56,57,61,63,65,67,80,81,82],
    'cloud-showers-heavy')
adddMapping([73,71,75,77,85,86],'snowflake')
adddMapping([95,96,99],'cloud-bolt')


function adddMapping(values,icon){
values.forEach(v => {
    ICON_MAP.set(v,icon)
});
}




