#version 140

out vec4 fragColor;

// Task_1_2 - ToDo Begin

in float a_height;

void main()
{
	// Apply a procedural texture here.

	// Tip: start with getting the height from the vertex stage
	// and think of a function that yields iso lines.
	// Tip: checkout step, clamp, and mod

	//float i = ... ;


    fragColor = vec4(a_height);

    if(step(0.146, mod(a_height, 0.15)) == 1)
        fragColor = vec4(0.0);


	// Task_1_2 - ToDo End
}
