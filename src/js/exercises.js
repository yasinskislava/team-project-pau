export default async function exercises() {
    fetch("https://energyflow.b.goit.study/api/filters?filter=Muscles&limit=36").then(val => val.json()).then(val => console.log(val));
}