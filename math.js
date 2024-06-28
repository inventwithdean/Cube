function matmul(a, b)
{
    // Assuming Shapes:
    // a: (3, 3)
    // b: (3,)
    let result = Array(3);
    for (let i=0; i<3; i++)
    {
        sum = 0;
        for (let j=0; j<3; j++)
        {
            sum += a[i][j]*b[j];
        }
        result[i] = sum;
    }
    return result;
}