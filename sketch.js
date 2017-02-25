var C_WIDTH     = 640;
var C_HEIGHT    = 500;

var X_ORIGIN    = 195;
var Y_ORIGIN    = 0;
var X_COUNT     = 10;
var Y_COUNT     = 20;
var G_SIZE      = 25;

var field       = new Field(X_ORIGIN, Y_ORIGIN, X_COUNT, Y_COUNT, G_SIZE);
var blocks      = new Blocks();
var actualBlock = null;

var timeStart;
var timeEnd;
var timeDiff    = 0;
var speedMillis = 300;

function setup()
{
    $('#container').css('width',  C_WIDTH  + 'px');
    $('#container').css('height', C_HEIGHT + 'px');

    frameRate(60);
    var canvas = createCanvas(C_WIDTH, C_HEIGHT);
    canvas.parent('container');

    field.getBox(3,10).color.r = 200;
    field.getBox(3,10).color.g = 0;
    field.getBox(3,10).color.b = 0;
    field.getBox(3,10).isUsed  = true;

    timeStart = timestamp();
}

function draw()
{
    background(50);

    field.draw();

    timeEnd     = timestamp();
    timeDiff    = timeEnd - timeStart;
    if (timeDiff > (speedMillis))
    {
        timeStart = timeEnd;
        checkActualBlock();
    }


    //TODO: automate the block-seed
    if (actualBlock != null) {
        actualBlock.draw();
    }
}

function checkActualBlock()
{
    if (actualBlock === null)
    {
        // generiere neuen Block
        actualBlock = blocks.getRandBlock();
    }
}

function keyPressed()
{
    if (keyCode == 32) // space pressed
    {
        if (actualBlock.checkRotationMove())
        {
            actualBlock.changeVariation();
        }

    }
    else if (keyCode == LEFT_ARROW)
    {
        if (actualBlock.checkLeftMove())
        {
            actualBlock.rx--;
        }
    }
    else if (keyCode == RIGHT_ARROW)
    {
        if (actualBlock.checkRightMove())
        {
            actualBlock.rx++;
        }
    }
    else if (keyCode == DOWN_ARROW)
    {
        if (actualBlock.checkDownMove())
        {
            actualBlock.ry++;
        }
    }
    else if (keyCode == UP_ARROW)
    {
        actualBlock = null;
    }
    return false;
}

function timestamp()
{
    return Date.now();
}
