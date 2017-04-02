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

    this.setUsed = function(block)
    {
        var elements    = block.variations[block.actualVariation].elements;
        var elColor     = block.color;

        for (var i = 0; i < elements.length; i++)
        {
            var element = elements[i];
            var box     = this.getBox(block.rx + element.distX, block.ry + element.distY);

            box.isUsed  = true;
            box.color.a = elColor.a;
            box.color.r = elColor.r;
            box.color.g = elColor.g;
            box.color.b = elColor.b;
        }
    }

    this.getBox = function(col, row)
    {
        return this.array[col][row];
    }

    this.checkLinesCleared = function()
    {
        var linesCleared = 0;

        for (var y = this.yCount-1; y >= 0; y--)    // check field from bottom up
        {
            var lineToClear = true;
            for (var x = 0; x < this.xCount; x++)   // check if every box of one row is used
            {
                var box = this.array[x][y];
                if (box.isUsed == false)    // if one box isn't used, don't clear the line and continue to the next upper row
                {
                    lineToClear = false;
                    break;
                }
            }
            if (lineToClear)
            {
                this.clearLine(y);
                linesCleared++;
            }
        }

        return linesCleared;
    }

    this.clearLine = function(row)
    {
        if (row > 0)
        {
            for (var y = row; y > 0; y--)   // for all rows in the range of rows to move one row done
            {
                for (var x = 0; x < xCount; x++)    // for all columns in one row to move, move the single column one row down
                {
                    this.array[x][y] = this.array[x][y-1];
                }
            }
        }

        for (var x = 0; x < xCount.length; x++)     // for the most upper row, create a new row
        {
            var box = new FieldBox( this.xOrigin + col*this.gridSize,
                                    this.yOrigin + row*this.gridSize,
                                    gridSize);

            box.color.a = 1;
            box.color.r = 98;
            box.color.g = 47;
            box.color.b = 83;

            this.array[x][0] = box;
        }

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

    this.logField = function()
    {
        var outputString = "";

        for (var y = 0; y < this.yCount; y++)
        {
            for (var x = 0; x < this.xCount; x++)
            {
                if (this.array[x][y].isUsed)
                {
                    outputString += "x  ";
                }
                else
                {
                    outputString += "_  ";
                }
            }
            outputString += "\n";
        }

        console.log(outputString);
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
