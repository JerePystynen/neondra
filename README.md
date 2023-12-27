# Neondra Project
This project truly put all of my technical and coding knowledge to its MAX limits. It took me a full year just deciding what I wanted Neondra to be. I've searched so many articles, tutorials, answers, and now is the time.

## The Code:

### UV Meter:
Here's a link to a YouTube video showcasing the UV Meter V2 library:
https://youtu.be/YVuYO014h0M
Found here:
https://forum.arduino.cc/t/ws2812-vu-meter/274775/2

### MATRIX DECLARATION:
Parameter 1 = width of NeoPixel matrix
Parameter 2 = height of matrix
Parameter 3 = pin number (most are valid)
Parameter 4 = matrix layout flags, add together as needed:
  NEO_MATRIX_TOP, NEO_MATRIX_BOTTOM, NEO_MATRIX_LEFT, NEO_MATRIX_RIGHT:
    Position of the FIRST LED in the matrix; pick two, e.g.
    NEO_MATRIX_TOP + NEO_MATRIX_LEFT for the top-left corner.
  NEO_MATRIX_ROWS, NEO_MATRIX_COLUMNS: LEDs are arranged in horizontal
    rows or in vertical columns, respectively; pick one or the other.
  NEO_MATRIX_PROGRESSIVE, NEO_MATRIX_ZIGZAG: all rows/columns proceed
    in the same order, or alternate lines reverse direction; pick one.
  See example below for these values in action.
Parameter 5 = pixel type flags, add together as needed:
  NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
  NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
  NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
  NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
