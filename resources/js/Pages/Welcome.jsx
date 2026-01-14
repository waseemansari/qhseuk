import { Link } from "@inertiajs/react";
import WebsiteBavbar from '@/Layouts/WebsiteBavbar';
import Footer from '@/Layouts/Footer';
export default function Welcome({ auth }) {
    return (
        <>
            <WebsiteBavbar />
            <main className="main-content">

                <section className="hero-section">
                    <div className="container">
                        <h1></h1>
                    </div>
                </section>
               
                <section className="courses-section">
                    <div className="container">
                        <div className="courses-grid">
                            <div className="course-image">

                                <Link href='course-detail/1'>
                                    <img src="../../images/1.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/2'>
                                    <img src="./images/2.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/3'>
                                    <img src="./images/3.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/4'>
                                    <img src="./images/4.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/5'>
                                    <img src="./images/5.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/6'>
                                    <img src="./images/6.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/7'>
                                    <img src="./images/7.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/8'>
                                    <img src="./images/8.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/9'>
                                    <img src="./images/9.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                 <Link href='course-detail/10'>
                                    <img src="./images/10.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/11'>
                                    <img src="./images/11.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>
                            <div className="course-image">
                                <Link href='course-detail/11'>
                                    <img src="./images/12.png" alt="NEBOSH Award in Environmental Awareness at Work" />
                                </Link>
                            </div>

                            {/* <div className="course-card">
                        <div className="course-image">
                            <img src="./images/img/5.jpeg" alt="NEBOSH Certificate in Fire Safety" />
                        </div>
                        <div class="course-content">
                            <h3>NEBOSH Certificate in Fire Safety</h3>
                            <p class="course-description">The NEBOSH Fire Safety Certificate (Launched 2021) is designed for managers and supervisors who are responsible for fire safety legislation and equips candidates with a range of practical fire safety skills.</p>
                            <a href="#" class="btn-link">Find out more</a>
                            <div class="course-price">
                                <span>Prices start from</span>
                                <strong>£415.00</strong>
                                <span class="vat">+ vat</span>
                            </div>
                            <button class="btn-primary">Book this course</button>
                        </div>
                    </div> */}


                        </div>
                    </div>
                </section>
                <section class="info-section">
                    <div class="container">
                        <div class="info-content">
                            <h2>Our NEBOSH courses are designed to provide managers, supervisors, and employees with the skills to deal with a variety of health and safety issues.</h2>
                            <div class="nebosh-logo">
                                <img src="./images/img.10jpeg" alt="NEBOSH gold learning partner" />
                            </div>
                            <p class="info-text">Here you'll find NEBOSH training on subjects such as <a href="#">construction</a>, <a href="#">oil and gas</a>, <a href="#">fire safety</a>, environmental issues, and more. Candidates can study <a href="#">online</a>, in their workplace, at a <a href="#">training centre</a>, or via <a href="#">distance learning</a>.</p>
                        </div>

                        <div class="info-blocks">
                            <div class="info-block">
                                <h3>What is NEBOSH?</h3>
                                <p>NEBOSH is the "National Examination Board in Occupational Safety & Health", an international organisation which offers leading health and safety qualifications. Over 400,000 people world-wide have gained a qualification from NEBOSH since it was founded in 1979, each having gained a professionally recognised and respected qualification.</p>
                            </div>

                            <div class="info-block">
                                <h3>What are NEBOSH Courses?</h3>
                                <p>More than <strong>50,000 people enrol on to NEBOSH courses every year</strong>, making them some of the most sought-after health and safety qualifications in the world.</p>
                                <p>Many employers ask for a <a href="#">NEBOSH Certificate</a> or <a href="#">NEBOSH Diploma</a> when recruiting health and safety professionals. NEBOSH Certificates offer a basic foundation for those embarking on a career or new to health and safety. Likewise, NEBOSH Diplomas deliver advanced training for those looking to further their career and responsibilities.</p>
                            </div>

                            <div class="info-block">
                                <h3>Who should enrol on a NEBOSH course?</h3>
                                <p>The range of NEBOSH courses is so extensive that there are qualifications to suit roles from all industries, including:</p>
                                <ul>
                                    <li>Health and safety advisors, officers, auditors, co-ordinators, executives</li>
                                    <li>Supervisors</li>
                                    <li>Managers and senior managers</li>
                                    <li>Ambitious health and safety professionals looking to further their career</li>
                                </ul>
                            </div>

                            <div class="info-block">
                                <h3>How much is the NEBOSH course?</h3>
                                <p>The price of NEBOSH courses depend on the training or qualification you want to take, as well as how you want to study it. Classroom courses and Virtual Classroom courses provide tutor led experiences alongside other students, either in a classroom or over zoom, with Virtual courses having a reduced cost. E-learning courses are cheaper than other learning options, but don't have any tutor led lessons, instead providing you with digital course materials.</p>
                            </div>
                        </div>

                        <div class="course-types">
                            <h2>Which NEBOSH course should I take?</h2>

                            <div class="course-type-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/v1658008745/book-nebosh-exam_ejn4zl.jpg" alt="NEBOSH Certificates" />
                                <div class="course-type-content">
                                    <h3>NEBOSH Certificates</h3>
                                    <p><strong>NEBOSH Certificates</strong> are some of the UK's most popular health and safety qualifications. They provide a strong foundation in health and safety systems and principles to help managers, supervisors, and employees with their day-to-day responsibilities. You don't need any previous health and safety qualifications to take these courses.</p>
                                </div>
                            </div>

                            <div class="course-type-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/v1658008745/book-nebosh-exam_ejn4zl.jpg" alt="NEBOSH Diplomas" />
                                <div class="course-type-content">
                                    <h3>NEBOSH Diplomas</h3>
                                    <p><strong>NEBOSH Diplomas</strong> are degree-level qualification, suited to health and safety managers, advisors, and consultants looking to advance their career. The NEBOSH Diploma helps to develop professional competence in order to manage risk, meet business objectives, and adhere to current regulations.</p>
                                </div>
                            </div>

                            <div class="course-type-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/v1658008745/book-nebosh-exam_ejn4zl.jpg" alt="NEBOSH Awards" />
                                <div class="course-type-content">
                                    <h3>NEBOSH Awards</h3>
                                    <p><strong>NEBOSH Awards</strong> are specially designed training courses, accredited by NEBOSH. They deliver focused learning experiences, covering key health and safety principles applicable across a variety of industries and working environments.</p>
                                </div>
                            </div>
                        </div>

                        <div class="study-methods">
                            <h2>Ways of Studying NEBOSH Courses</h2>
                            <p>Study for your NEBOSH qualification <a href="#">online</a>, in a <a href="#">classroom</a>, via <a href="#">distance learning</a> or <a href="#">in-house</a> with QHSEINTERNATIONAL. All of our learning types come with the QHSEINTERNATIONAL pass pledge which means that candidates are entitled to continue studying (free of charge) if they fail to meet the required standard in the examinations. Although, with our above average pass rates, this is rarely necessary when studying with QHSEINTERNATIONAL.</p>
                            <p>For more information on NEBOSH Certificates and Diploma, as well as a detailed comparison of the two types of qualification, read our <a href="#">blog post here.</a></p>
                        </div>
                    </div>
                </section>
                <section class="why-choose-section">
                    <div class="container">
                        <h2>Why choose a NEBOSH course from QHSEINTERNATIONAL?</h2>
                        <div class="features-grid">
                            <div class="feature-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/c_limit,w_132,h_132/v1660043877/logos/tick-in-circle_bbyp04.png" alt="Tick icon" />
                                <h3>Accredited Partner</h3>
                                <p>QHSEINTERNATIONAL Health and Safety is a NEBOSH Gold Partner. This accreditation means our NEBOSH course materials, tutors, and learning environments are all stamped with excellence.</p>
                            </div>

                            <div class="feature-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/c_limit,w_132,h_132/v1660043877/logos/tick-in-circle_bbyp04.png" alt="Tick icon" />
                                <h3>Expertise</h3>
                                <p>We are one of the UK's leading providers of training in health and safety. Our tutors and mentors are widely respected for their expertise, experience and ability to provide an enjoyable learning experience.</p>
                            </div>

                            <div class="feature-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/c_limit,w_132,h_132/v1660043877/logos/tick-in-circle_bbyp04.png" alt="Tick icon" />
                                <h3>Student Support</h3>
                                <p>We go the extra mile to make sure our course attendees receive the best possible support, through study guides and student groups. Many candidates find our Facebook community group particularly helpful while they are studying, as it enables them to compare notes with fellow students and ask questions.</p>
                            </div>

                            <div class="feature-card">
                                <img src="https://res.cloudinary.com/ddoiy8grq/image/upload/c_limit,w_132,h_132/v1660043877/logos/tick-in-circle_bbyp04.png" alt="Tick icon" />
                                <h3>The QHSEINTERNATIONAL Pass Pledge</h3>
                                <p>Every QHSEINTERNATIONAL NEBOSH course entitles you to continue studying free of charge if you fail to meet the required standard in examinations. However, this is rarely necessary. Our pass rate for NEBOSH General Certificate training courses is over 90%, with a high number of credits and distinctions.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="faq-section">
                    <div class="container">
                        <h2>Popular NEBOSH FAQ's</h2>
                        <a href="#" class="view-all-link">View all FAQs</a>

                        <div class="faq-list">
                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>Which NEBOSH online courses do we offer?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <ul>
                                        <li><a href="#">NEBOSH National General Certificate</a></li>
                                        <li><a href="#">NEBOSH International General Certificate</a></li>
                                        <li><a href="#">The NEBOSH Health and Safety Management for Construction Certificate (UK)</a></li>
                                        <li><a href="#">The NEBOSH Health and Safety Management for Construction Certificate (International)</a></li>
                                        <li><a href="#">NEBOSH Certificate in Fire Safety</a></li>
                                        <li><a href="#">NEBOSH Environmental Management Certificate</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>When and how will I receive my NEBOSH results?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <p>Results are distributed by NEBOSH after completing the course. NEBOSH send out the results 10-12 weeks after the exams. Your certificates will arrive after the results have been announced.</p>
                                </div>
                            </div>

                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>How long does a NEBOSH Course take to study?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <p>The length of a NEBOSH course can vary depending on the qualification you're taking. They can take as little as one day in-house or 12 hours online, spending up to 27 days or 330 hours on the course. Please bear in mind that your assessments will take additional time. The NEBOSH Diploma takes the longest, with students spending an average of 330 hours on the course and an additional 80 assessment hours. Browse our NEBOSH courses to see how long each NEBOSH course should take.</p>
                                </div>
                            </div>

                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>When and how will I receive my NEBOSH certificate/diploma?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <p>Your certificate or diploma is sent to you by QHSEINTERNATIONAL after the results have been announced. Your certificates will arrive from QHSEINTERNATIONAL 10-12 weeks after the results have been announced.</p>
                                </div>
                            </div>

                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>Are NEBOSH Courses Hard to Pass?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <p>NEBOSH Courses can be challenging, but with the right amount of effort you'll find yourself prepared to pass. That's why we recommend additional self study hours on top of the duration of the course to make sure you're fully prepared for the assessments when the time comes.</p>
                                </div>
                            </div>

                            <div class="faq-item">
                                <button class="faq-question">
                                    <span>What happens if I fail the NEBOSH assessment?</span>
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    <p>The QHSEINTERNATIONAL Pass Pledge will cover your additional studies, but you retake the exams at your own cost.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
