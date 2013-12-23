#version 140

// Task_1_3 - ToDo Begin
uniform sampler2D waterheights;
uniform mat4 transform;
uniform vec3 a_offset;
uniform float a_time;
uniform mat4 vpi;

in vec3 a_vertex;
out vec3 a_position;
out float a_height;
out vec3 v_eye;

void main()
{
    a_position = a_vertex;
    gl_Position = vec4(a_vertex, 1.0);
    gl_Position.y += 0.21;
    gl_Position.y += texture(waterheights, a_vertex.xz+vec2(a_time)/3).a/12;

    a_height = gl_Position.y;
    gl_Position = transform * gl_Position;
    v_eye = (vpi * vec4(gl_Position.xyz, 2.0)).xyz;

}
