function Blocks(gridSize)
{
    this.gridSize   = gridSize;
    this.tetris     = [];

    var blockS = new Block(5,5);
    blockS.color.a = 1;
    blockS.color.r = 0;
    blockS.color.g = 230;
    blockS.color.b = 0;
    blockS.addVariation([   new BlockElement(0,0),
                            new BlockElement(1,0),
                            new BlockElement(0,-1),
                            new BlockElement(-1,-1)]);

    blockS.addVariation([   new BlockElement(0,0),
                            new BlockElement(1,0),
                            new BlockElement(1,1),
                            new BlockElement(0,-1)]);



    //TODO: add the rest of the blocks

    this.tetris.push(blockS);
}

function Block(seedX, seedY)
{
    this.seedX  = seedX;
    this.seedY  = seedY;
    this.rx     = seedX;    //reference x
    this.ry     = seedY;    //reference y
    this.actualVariation = 0;

    this.color  = new function()
    {
        this.a  = 1; // alpha 0-1
        this.r  = 50; // red   0-255
        this.g  = 50; // green 0-255
        this.b  = 50; // blue  0-255
    }

    this.variations = [];
    this.addVariation = function(elements)
    {
        var variation = new BlockVariation(elements)
        this.variations.push(variation);
    }

    this.changeVariation = function()
    {
        if (this.actualVariation >= this.variations.length-1)
        {
            this.actualVariation = 0;
        }
        else
        {
            this.actualVariation++;
        }
    }

    this.getNextVariationNumber = function()
    {
        if (this.actualVariation >= this.variations.length-1)
        {
            return 0;
        }
        else
        {
            return this.actualVariation+1;
        }
    }

    this.checkLeftMove = function()
    {
        var variation   = this.variations[this.actualVariation];
        var elements    = variation.elements;
        var box         = field.getBox(this.rx, this.ry);

        for (var i = 0; i < elements.length; i++)
        {
            var elem    = elements[i];
            var x       = box.x + elem.distX * G_SIZE;

            if (x == X_ORIGIN)
            {
                return false;
            }
            else if (field.getBox(  this.rx + elem.distX - 1,
                                    this.ry + elem.distY).isUsed == true )
            {
                return false;
            }
        }
        return true;
    }

    this.checkRightMove = function()
    {
        var variation   = this.variations[this.actualVariation];
        var elements    = variation.elements;
        var box         = field.getBox(this.rx, this.ry);

        for (var i = 0; i < elements.length; i++)
        {
            var elem    = elements[i];
            var x       = box.x + elem.distX * G_SIZE;

            if (x >= (X_ORIGIN+X_COUNT*G_SIZE)-G_SIZE)
            {
                return false;
            }
            else if (field.getBox(  this.rx + elem.distX + 1,
                                    this.ry + elem.distY).isUsed == true )
            {
                return false;
            }
        }
        return true;
    }

    this.checkDownMove = function()
    {
        var variation   = this.variations[this.actualVariation];
        var elements    = variation.elements;
        var box         = field.getBox(this.rx, this.ry);

        for (var i = 0; i < elements.length; i++)
        {
            var elem    = elements[i];
            var y       = box.y + elem.distY * G_SIZE;

            if (y >= (Y_ORIGIN+Y_COUNT*G_SIZE)-G_SIZE)
            {
                return false;
            }
            else if (field.getBox(  this.rx + elem.distX,
                                    this.ry + elem.distY + 1).isUsed == true )
            {
                return false;
            }
        }
        return true;
    }

    this.checkRotationMove = function()
    {
        var variation   = this.variations[this.getNextVariationNumber()];
        var elements    = variation.elements;
        var box         = field.getBox(this.rx, this.ry);

        for (var i = 0; i < elements.length; i++)
        {
            var elem    = elements[i];
            var y       = box.y + elem.distY * G_SIZE;
            var x       = box.x + elem.distX * G_SIZE;

            if (y >= (Y_ORIGIN+Y_COUNT*G_SIZE)) // nicht nach unten raus
            {
                return false;
            }
            else if (x >= (X_ORIGIN+X_COUNT*G_SIZE)) // nicht nach rechts raus
            {
                return false;
            }
            else if (x < X_ORIGIN) // nicht nach links raus
            {
                return false;
            }
            else if (field.getBox(  this.rx + elem.distX,
                                    this.ry + elem.distY).isUsed == true ) // nicht schon belegt
            {
                return false;
            }
        }
        return true;
    }

    this.draw = function()
    {
        fill('rgba('    +       this.color.r
                        + ',' + this.color.g
                        + ',' + this.color.b
                        + ',' + this.color.a +')');

        var variation   = this.variations[this.actualVariation];
        var elements    = variation.elements;
        var box         = field.getBox(this.rx, this.ry);

        for (var i = 0; i < elements.length; i++)
        {
            var elem    = elements[i];

            rect( box.x + elem.distX * G_SIZE,
                  box.y + elem.distY * G_SIZE,
                  G_SIZE,
                  G_SIZE);
        }
    }
}

function BlockVariation(elements)
{
    this.elements = elements;
}

function BlockElement(distX, distY)
{
    this.distX = distX;
    this.distY = distY;
}
