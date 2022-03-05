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

class FlagQuad{

    constructor(xAxis, zAxis, material, length){
        this.geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            xAxis + length/2, 0, zAxis,
            xAxis - length/2, 0, zAxis,
            xAxis - length/2, length, zAxis,
            xAxis - length/2, length, zAxis
        ]);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.mesh = new THREE.Mesh(this.geometry, material);

    }
}