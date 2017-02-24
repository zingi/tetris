var C_WIDTH     = 640;
var C_HEIGHT    = 500;

var X_ORIGIN    = 195;
var Y_ORIGIN    = 0;
var X_COUNT     = 10;
var Y_COUNT     = 20;
var G_SIZE      = 25;

var field       = new Field(X_ORIGIN, Y_ORIGIN, X_COUNT, Y_COUNT, G_SIZE);
var blocks      = new Blocks();

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

    console.log(field);
}

function draw()
{
    background(50);

    field.draw();

    //TODO: automate the block-seed
    blocks.tetris[0].draw();
}

function keyPressed()
{
    if (keyCode == 32) // space pressed
    {
        if (blocks.tetris[0].checkRotationMove())
        {
            blocks.tetris[0].changeVariation();
        }

    }
    else if (keyCode == LEFT_ARROW)
    {
        if (blocks.tetris[0].checkLeftMove())
        {
            blocks.tetris[0].rx--;
        }
    }
    else if (keyCode == RIGHT_ARROW)
    {
        if (blocks.tetris[0].checkRightMove())
        {
            blocks.tetris[0].rx++;
        }
    }
    else if (keyCode == DOWN_ARROW)
    {
        if (blocks.tetris[0].checkDownMove())
        {
            blocks.tetris[0].ry++;
        }
    }
    return false;
}
