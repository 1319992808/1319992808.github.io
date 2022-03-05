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
    }
}

class YearData{
    constructor(){
        this.rawData = [
            "Japan", "Japan", "Japan", "Japan", "Japan",
            "Japan", "Japan", "Japan", "Japan", "Japan",
            "Japan", "Japan", "Japan", "Japan", "Japan",
            "Japan", "Japan", "Japan", "Japan", "Japan",
            "Japan", "Japan", "Japan", "Japan", "Japan",
        ];
        this.startYear = 1980;
    }
    getYearRank(year, rank){
        return this.rawData(5 * (year- this.startYear)/4 + rank - 1);
    }
}