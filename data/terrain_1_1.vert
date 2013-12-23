#version 140

// Task_1_1 - ToDo Begin

uniform mat4 transform;

in vec3 a_vertex;

void main()
{
    gl_Position = transform * vec4(a_vertex, 1.0);

}
