function Field(xOrigin, yOrigin, xCount, yCount, gridSize)
{
    this.xOrigin    = xOrigin;
    this.yOrigin    = yOrigin;
    this.xCount     = xCount;
    this.yCount     = yCount;
    this.gridSize   = gridSize;

    this.array      = new Array(xCount);

    for (var col=0; col<this.xCount; col++) // einzelnen Boxen des Feldes erstellen
    {
        this.array[col] = new Array(yCount);
        for (var row=0; row<this.yCount; row++)
        {
            var box = new FieldBox( this.xOrigin + col*this.gridSize,
                                    this.yOrigin + row*this.gridSize,
                                    gridSize);

            box.color.a = 1;
            box.color.r = 98;
            box.color.g = 47;
            box.color.b = 83;

            this.array[col][row] = box;
        }
    }

    this.getBox = function(col, row)
    {
        return this.array[col][row];
    }

    this.draw = function()
    {
        for (var col=0; col<this.xCount; col++)
        {
            for (var row=0; row<this.yCount; row++)
            {
                this.array[col][row].draw();
            }
        }
    }
}

function FieldBox(x, y, size)
{
    this.x      = x;
    this.y      = y;
    this.size   = size;
    this.isUsed = false;

    this.color  = new function()
    {
        this.a  = 0.1; // alpha 0-1
        this.r  = 240; // red   0-255
        this.g  = 240; // green 0-255
        this.b  = 240; // blue  0-255
    }
    this.draw   = function()
    {
        fill('rgba('    + this.color.r
                        + ',' + this.color.g
                        + ',' + this.color.b
                        + ',' + this.color.a +')');

        // x,y,width,height
        rect(   this.x,
                this.y,
                this.size,
                this.size);
    }
}
