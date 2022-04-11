class VerticalLine{
    
    constructor(zAxis, xAxis, material){
        this.x = xAxis;
        this.material = material;
        this.points = [];
        this.points.push(new THREE.Vector3(this.x, 0, zAxis));
        this.points.push(new THREE.Vector3(this.x, 0, zAxis + 100));
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new THREE.Line(this.geometry, material);
    }
    getGeo() {
        return this.line;
    }
}

class HorizontalLine{
    
    constructor(zAxis, width, material){
        this.z = zAxis;
        this.material = material;
        this.points = [];
        this.points.push(new THREE.Vector3(width/2 , 0, zAxis));
        this.points.push(new THREE.Vector3(-width/2, 0, zAxis));
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new THREE.Line(this.geometry, material);
    }
    getGeo() {
        return this.line;
    }
}
class ConnectedLine{
    constructor(x1, z1, x2, z2, material){
        const rankColors = [
            {r: 0.443, g: 0.35, b:0.556},
            {r: 133.0/255, g: 44.0/255, b:130.0/255},
            {r: 181.0/255, g: 47.0/255, b:89.0/255},
            {r: 245.0/255, g: 175.0/255, b:113.0/255},
            {r: 252.0/255, g: 251.0/255, b:188.0/255},
            
        ];

        var indexX1 = parseInt(x1/2.8) + 2;
        var indexX2 = parseInt(x2/2.8) + 2;
        const colors = new Float32Array([
            rankColors[indexX1].r, rankColors[indexX1].g, rankColors[indexX1].b,
            rankColors[indexX1].r, rankColors[indexX1].g, rankColors[indexX1].b,
            rankColors[indexX2].r, rankColors[indexX2].g, rankColors[indexX2].b,
            rankColors[indexX2].r, rankColors[indexX2].g, rankColors[indexX2].b,

        ]);
        
        this.points = [];
        var width = 0.04;
        this.points.push(new THREE.Vector3(x1-width, 0, z1));
        this.points.push(new THREE.Vector3(x1+width, 0, z1));
        this.points.push(new THREE.Vector3(x2-width, 0, z2));
        this.points.push(new THREE.Vector3(x2+width, 0, z2));

        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.geometry.addAttribute(
            'color',
            new THREE.BufferAttribute(new Float32Array(colors), 3)
        );
        this.geometry.setIndex([0, 1, 2, 1, 3, 2]);
        this.line = new THREE.Mesh(this.geometry, material);
    }
    getGeo(){
        return this.line;
    }
}
class CountryFlag{
    constructor(country){
        this.length = 1.4;
        this.texture = new THREE.TextureLoader().load( 'assets/flags/' + country + '.png' );
        this.planeGeo = new THREE.PlaneGeometry(this.length, this.length);
    }
    createMesh(transparency){
        transparency = (typeof transparency !== 'undefined') ? transparency : 1.0;
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, map: this.texture, transparent:true, opacity : transparency});
        return new THREE.Mesh(this.planeGeo, this.material);
    }
} 

class PathNode{
    constructor(rank, year, country){
        this.rank = rank;
        this.year = year;
        this.country = country;

        //World Position
        this.x = 2 * (3 - rank) * 1.4; //half band width 1.4
        this.y = 0.7;
        this.z = (year - 1948)/4 * 8.0; // vertical length 8.0

        this.mesh;
    }
}

class YearData{
    constructor(){
        this.rawData = [
            
            "America","Sweden",  "France", "Hangary", "Italy", //1948
            "America","SovietUnion",  "Hangary", "Sweden", "Italy", //1952
            "SovietUnion","America",  "Austrilia", "Hangary", "Italy", //1956
            "SovietUnion","America",  "Italy", "Germany", "Austrilia", //1960
            "America", "SovietUnion", "Japan", "EUA", "Italy", //1964
            "America", "SovietUnion", "Japan", "Hangary", "Germany", //1968
            "SovietUnion", "America", "DDR", "Germany", "Japan", //1972
            "SovietUnion", "DDR", "America", "Germany", "Japan", //1976
            "SovietUnion", "DDR", "Bulgaria", "Cuba", "Italy", //1980
            "America", "Romania", "Germany", "China", "Italy",  //1984
            "SovietUnion", "DDR", "America", "Korea", "Germany",  //1988
            "CIS", "America", "Germany", "China", "Cuba",  //1992
            "America", "Russia", "Germany", "China", "France",  //1996
            "America", "Russia", "China", "Austrilia", "Germany",  //2000
            "America", "China", "Russia", "Austrilia", "Japan",  //2004
            "China", "America", "Russia", "UK", "Germany",  //2008
            "America", "China", "UK", "Russia", "Korea",  //2012
            "America", "UK", "China", "Russia", "Germany",  //2016
            "America", "China", "Japan", "UK", "ROT",  //2020
        ];
        this.rankCount = 5;
        this.yearCount = this.rawData.length / this.rankCount;
        this.startYear = 1948;
        this.yearFreq = 4;
    }
    getYearRank(year, rank){
        return this.rawData[this.rankCount * (year- this.startYear)/this.yearFreq + rank - 1];
    }
}

