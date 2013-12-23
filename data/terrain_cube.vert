#version 140

// Task_1_3 - ToDo Begin

uniform mat4 transform;
uniform sampler2D height;

in vec3 a_vertex;

out float a_height;
out vec3 a_texelPosition;
out vec3 a_normal;

vec3 north;
vec3 east;
vec3 south;
vec3 west;
float space;
vec3 a_offset = vec3(0.0, 0.0, 0.0);

void main()
{
	// Note: should be similar to 1_2 vertex shader.
	// In addition, you need to pass the texture coords
	// to the fragment shader...

	// ..

    gl_Position = vec4(a_vertex, 1.0);
    a_texelPosition = a_vertex;
    a_height = texture2D(height, gl_Position.xz + a_offset.xz);
    gl_Position.y += a_height + a_offset.y;
    //gl_Position = transform * gl_Position;

    space = 0.01;
    north = a_vertex - vec3(0.0, 0.0, space);
	east = a_vertex + vec3(space, 0.0, 0.0);
	south = a_vertex + vec3(0.0, 0.0, space);
	west = a_vertex - vec3(space, 0.0, 0.0);

	//

	north.y = texture2D(height, north.xz + a_offset.xy);
    east.y = texture2D(height, east.xz + a_offset.xy);
    south.y = texture2D(height, south.xz + a_offset.xy);
    west.y = texture2D(height, west.xz + a_offset.xy);
	// Task_1_2 - ToDo End

	a_normal = normalize(cross(north - south, east - west));

	// Task_1_3 - ToDo End
}
