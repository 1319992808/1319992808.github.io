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
    }
}

class YearData{
    constructor(){
        this.rawData = [
            "Japan", "China", "America", "Canada", "Korea", //1980
            "China", "Japan", "America", "Canada", "Korea",  //1984
            "Japan", "China", "America", "Canada", "Korea",  //1988
            "Japan", "China", "America", "Korea", "Canada",  //1992
            "Japan", "China", "America", "Canada", "Korea",  //1996
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

