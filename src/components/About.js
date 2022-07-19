import React from 'react';

export default function About() {
  return (
    <>
      <div classNameName="container jumbotron opacity-100" >
        <h1 className="display-4">Keep</h1>
        <p className="lead">"Save what's on your mind" describes its function as a note-taking service. </p>
        <hr className="my-4" />
        <p>Keep is a free online service where user can store its ideas ,  views , todos etc. in your account privately and safely .  </p>
        <p>Browser compatible : This note taking service software works in any web browsers such as chrome , firefox, edge , safari , opera .  </p>
        <br />
        <p><b>Github link</b>:- <a href="https://www.github.com/ayush1614/keep">Keep</a></p>
        <p className='lead'>
          Want to Know more! Connect with me : &nbsp;
          <b>
            <a href="https://www.linkedin.com/in/ayush-katiyar-b893b3193/"><i className="fa-brands fa-linkedin fs-3"></i></a> &nbsp;
            <a href="mailto:katiyarayush2000@gmail.com"><i class="fa-solid fa-envelope"></i></a>&nbsp;&nbsp;
            <a href="https://www.github.com/ayush1614"><i className="fa-brands fa-github fs-3"></i></a>
          </b>
        </p>
      </div>
    </>
  );

}