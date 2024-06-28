
square_side = 110;
angle = 0;
angV = 0.01;

function setup() {
    pts = [
        [-square_side, -square_side, square_side],
        [square_side, -square_side, square_side],
        [square_side, square_side, square_side],
        [-square_side, square_side, square_side],
        [-square_side, -square_side, -square_side],
        [square_side, -square_side, -square_side],
        [square_side, square_side, -square_side],
        [-square_side, square_side, -square_side],
    ];
    projected_pts = [
        [-square_side, -square_side, square_side],
        [square_side, -square_side, square_side],
        [square_side, square_side, square_side],
        [-square_side, square_side, square_side],
        [-square_side, -square_side, -square_side],
        [square_side, -square_side, -square_side],
        [square_side, square_side, -square_side],
        [-square_side, square_side, -square_side],
    ];
    createCanvas(windowWidth, windowHeight);
  }
  function draw() {
    background(255);
    stroke(0);
    strokeWeight(16);
    translate(windowWidth/2, windowHeight/2);
    
    let rotationMatZ = [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1]
    ];
    let rotationMatX = [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle), cos(angle)]
    ]
    let rotationMatY = [
        [cos(angle), 0, sin(angle)],
        [0, 1, 0],
        [-sin(angle), 0, cos(angle)]
    ]
    distance = 2;
    for (let i=0; i<pts.length; i++)
    {
        rotated = matmul(rotationMatX, pts[i]);
        rotated = matmul(rotationMatY, rotated);
        // rotated = matmul(rotationMatZ, rotated);
        z = 1 /(distance - rotated[2]/200);
        // z=1
        projectionMat = [
        [z, 0, 0],
        [0, z, 0], 
        [0, 0, 1]];
    
        projected = matmul(projectionMat, rotated);
        projected_pts[i] = projected;
        strokeWeight(map(projected[2], -square_side, square_side, 16, 24));
        point(projected_pts[i][0], projected_pts[i][1]);
    }

    ConnectLines();
    angle += angV;
    if (angle >= TWO_PI)
    {
        angle = 0;
    }
  }

function ConnectLines()
{
    for (let i=0; i<pts.length; i++)
        {
            Join(projected_pts[i], projected_pts[i%4]);
            Join(projected_pts[(i+1)%4], projected_pts[i%4]);
            if (i >=4)
            {
                Join(projected_pts[(i)%8], projected_pts[(i+1)%4 + 4]);
            }
        }
}
function Join(a, b)
{
    strokeWeight(map(Math.max(a[2], b[2]), -square_side, square_side, 1, 3));
    line(a[0], a[1], b[0], b[1]);
}