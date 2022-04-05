class VerticalLine{
    
    constructor(xAxis, material){
        this.x = xAxis;
        this.material = material;
        this.points = [];
        this.points.push(new THREE.Vector3(this.x, 0, 0));
        this.points.push(new THREE.Vector3(this.x, 0, 100));
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
        this.points = [];
        this.points.push(new THREE.Vector3(x1, 0, z1));
        this.points.push(new THREE.Vector3(x2, 0, z2));
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new THREE.Line(this.geometry, material);
    }
    getGeo(){
        return this.line;
    }
}
class CountryFlag{
    constructor(country){
        this.length = 1.4;
        this.texture = new THREE.TextureLoader().load( 'assets/flags/' + country + '.png' );
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, map: this.texture, transparent:true, opacity : 1.0});
        this.planeGeo = new THREE.PlaneGeometry(this.length, this.length);
    }
    createMesh(){
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
        this.z = (year - 1980)/4 * 8.0; // vertical length 8.0

        this.mesh;
    }
}

class YearData{
    constructor(){
        this.rawData = [
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
        this.startYear = 1980;
        this.yearFreq = 4;
    }
    getYearRank(year, rank){
        return this.rawData[this.rankCount * (year- this.startYear)/this.yearFreq + rank - 1];
    }
}

