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
var clearBlock  = false;

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
        checkActualBlock();
        timeStart = timeEnd;
    }

    if (actualBlock != null)
    {
        actualBlock.draw();
    }
}

function checkActualBlock()
{
    if (clearBlock)
    {
        // set Field as used
    }
    if (actualBlock === null)
    {
        // generiere neuen Block
        actualBlock = blocks.getRandBlock();
    }
    moveBlock('down');

    //TODO: check if cannont move further: generate new block
}

function moveBlock(move)
{
    if (actualBlock === null)
    {
        return;
    }
    else if (move == 'rotate')
    {
        if (actualBlock.checkRotationMove())
        {
            actualBlock.changeVariation();
        }
    }
    else if (move == 'left')
    {
        if (actualBlock.checkLeftMove())
        {
            actualBlock.rx--;
        }
    }
    else if (move == 'right')
    {
        if (actualBlock.checkRightMove())
        {
            actualBlock.rx++;
        }
    }
    else if (move == 'down')
    {
        if (actualBlock.checkDownMove())
        {
            actualBlock.ry++;
        }
    }
}

function keyPressed()
{
    if (keyCode == 32) // space pressed
    {
        moveBlock('rotate');
    }
    else if (keyCode == LEFT_ARROW)
    {
        moveBlock('left');
    }
    else if (keyCode == RIGHT_ARROW)
    {
        moveBlock('right');
    }
    else if (keyCode == DOWN_ARROW)
    {
        moveBlock('down');
    }
    else if (keyCode == UP_ARROW)
    {
        field.setUsed(actualBlock); // for testing:
        actualBlock = null;         // generate new block, fix actual block
    }
    return false;
}

function timestamp()
{
    return Date.now();
}
