#version 140

// Task_1_3 - ToDo Begin

uniform mat4 transform;

in vec3 a_vertex;
out vec3 a_position;

void main()
{
    gl_Position = vec4(a_vertex, 1.0);
    gl_Position.y += 0.21;
    gl_Position = gl_Position;
    a_position = a_vertex;

}
