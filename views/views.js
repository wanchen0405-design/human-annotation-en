// informed consent page
var informed_consent = {
    name: "informed_consent",
    title: "Consent to Participate in Research",
    consent_text:
        "<p>Dr. Elisa Kreiss, from the Communication Department at the University of California, Los Angeles is conducting a research study. This study is being funded by The Society of Hellman Fellows Program. You were selected as a possible participant in this study because you are 18 years of age or older. Your participation in this research study is voluntary.</p>" +
        "<br>"+
        "<p><strong>WHAT SHOULD I KNOW ABOUT A RESEARCH STUDY?</strong></p>" +
        "<p>The research study will be explained to you.</p>" +
        "<p>Whether or not you take part is up to you.</p>" +
        "<p>You can choose not to take part.</p>" +
        "<p>You can agree to take part and later change your mind.</p>" +
        "<p>Your decision will not be held against you.</p>" +
        "<br>"+
        "<p><strong>WHY IS THIS RESEARCH BEING DONE?</strong></p>" +
        "<p>The purpose of the research is to understand how people evaluate visual scenes. By studying the ways people evaluate images, we can gain insights into human communication and how people process what they see.</p>" +
        "<br>"+
        "<p><strong>HOW LONG WILL THE RESEARCH LAST AND WHAT WILL I NEED TO DO?</strong></p>" +
        "<p>Participation will take a total of about 10 minutes. You will be asked to view a few images and select parts of the image descriptions according to the instructions. Afterwards, you will also respond to a few brief post-survey questions.</p>" +
        "<br>"+
        "<p><strong>ARE THERE ANY RISKS IF I PARTICIPATE?</strong></p>" +
        "<p>There are no anticipated risks or discomforts.</p>" +
        "<br>"+
        "<p><strong>ARE THERE ANY BENEFITS IF I PARTICIPATE?</strong></p>" +
        "<p>You will not directly benefit from your participation in the research. However, your participation may help researchers better understand how people view images and how this knowledge can be applied in future research.</p>" +
        "<p><strong>What other choices do I have if I choose not to participate?</strong></p>" +
        "<p>Your alternative to participating in this research study is to not participate.</p>" +
        "<br>"+
        "<p><strong>HOW WILL INFORMATION ABOUT ME AND MY PARTICIPATION BE KEPT CONFIDENTIAL?</strong></p>" +
        "<p>The researchers will do their best to ensure that your private information is kept confidential. Information about you will be handled as confidentially as possible, but participating in research may involve a loss of privacy and the potential for a breach in confidentiality. Study data will be physically and electronically secured. As with any use of electronic means to store data, there is a risk of breach of data security.</p>" +
        "<p><strong>Use of personal information that can identify you:</strong> We will not collect any personal information that could identify you.</p>" +
        "<p><strong>How information about you will be stored:</strong> Any data collected as part of this study will be stored in a safe and secure location. An anonymized version of the study data may be distributed to facilitate replication of the work and follow-up work.</p>" +
        "<p><strong>People and agencies that will have access to your information:</strong><br>The research team, authorized UCLA personnel, and the study sponsor may have access to study data and records to monitor the study. Research records provided to authorized, non-UCLA personnel will not contain identifiable information about you. Publications and/or presentations that result from this study will not identify you by name.<br>" +
        "Employees of the University may have access to identifiable information as part of routine processing of your information, such as lab work or processing payment.<br>" +
        "However, University employees are bound by strict rules of confidentiality.<br></p>" +
        "<p><strong>How long information from the study will be kept:</strong> Anonymized data from the study will remain available indefinitely.</p>" +
        "<br>"+
        "<p><strong>USE OF DATA FOR FUTURE RESEARCH</strong></p>" +
        "<p>Your data, including de-identified data may be kept for use in future research. The descriptions written in this study will likely be shown (fully anonymized) to other participants in subsequent studies.</p>" +
        "<br>"+
        "<p><strong>WHO CAN I CONTACT IF I HAVE QUESTIONS ABOUT THIS STUDY?</strong></p>" +
        "<p><strong>The research team:</strong> If you have any questions, comments or concerns about the research, you can talk to one of the researchers. Please contact: Dr. Elisa Kreiss at ekreiss@ucla.edu, or by phone at (310) 825-1703.</p>" +
        "<p><strong>UCLA Office of the Human Research Protection Program (OHRPP):</strong> If you have questions about your rights as a research participant, or you have concerns or suggestions and you want to talk to someone other than the researchers, you may contact the UCLA OHRPP by phone: (310) 206-2040; by email: participants@research.ucla.edu or by mail: Box 951406, Los Angeles, CA 90095-1406.</p>" +
        "<br>"+
        "<p><strong>WHAT ARE MY RIGHTS IF I TAKE PART IN THIS STUDY?</strong></p>" +
        "<p>You can choose whether or not you want to be in this study, and you may withdraw your consent and discontinue participation at any time.</p>" +
        "<p>Whatever decision you make, there will be no penalty to you, and no loss of benefits to which you were otherwise entitled.</p>" +
        "<p>You may refuse to answer any questions that you do not want to answer and still remain in the study.</p>" +
        "<br>"+
        "<p><strong>WHY SHOULD I CONSENT TO PARTICIPATE?</strong></p>" +
        "<p>If you consent to participate, you will be helping us understand how people evaluate visual scenes. Your participation is voluntary, and you are free to withdraw at any time. Your decision will not be held against you.</p>",
    render: function() {
        var viewTemplate = $("#informed-consent-view").html();
        
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                consent_text: this.consent_text
            })
        );

        var consentYes = $("#consent-yes");
        var consentNo = $("#consent-no");
        var nextButton = $("#next");

        // Function to enable/disable next button based on selection
        var updateNextButton = function() {
            if (consentYes.is(":checked") || consentNo.is(":checked")) {
                nextButton.prop("disabled", false);
            } else {
                nextButton.prop("disabled", true);
            }
        };

        // Event listeners for checkboxes
        consentYes.on("change", function() {
            if ($(this).is(":checked")) {
                consentNo.prop("checked", false);
            }
            updateNextButton();
        });

        consentNo.on("change", function() {
            if ($(this).is(":checked")) {
                consentYes.prop("checked", false);
            }
            updateNextButton();
        });

        // Next button click handler
        nextButton.on("click", function() {
            if (consentYes.is(":checked")) {
                // User consented, go to instructions
                exp.findNextView();
            } else if (consentNo.is(":checked")) {
                // User declined, go to thanks page
                exp.currentViewCounter = exp.views_seq.length - 1; // Go to last view (thanks)
                exp.currentTrialInViewCounter = 0;
                exp.findNextView();
            }
        });

        // Initially disable the next button
        nextButton.prop("disabled", true);
    },
    trials: 1
};

// introduction page
var intro = {
    name: "intro",
    // introduction title
    title: "Introduction", 
    // introduction text
    text:
        "<p>Hi and welcome to the study!</p><br><p>In the following section, you will see <strong>5 photos</strong>. For each photo, please <strong>identify the focal subject/object</strong>, then <strong>highlight text in the image description</strong> that describes the focal and the background separately.</p><br><p><strong>Focal</strong>: The focal is the <strong>main object or subject</strong> in the image.</p><br><p><strong>Background</strong>: The background is <strong> everything else </strong> occurring in the scene that provides context and setting. Things that can not be directly observed from the image do not count as backgrounds. </p><br><p>Afterward, you will answer two brief questions about where you live and what languages you speak.</p><br><p>When you are ready, please click the button below to begin.</p>",
    buttonText: "Begin experiment",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();

        $("#main").html(
            Mustache.render(viewTemplate, {
                //picture: "stimuli/stanford-nlp-logo.jpg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

// main page
var main = {
    name: "main",
    render: function(CT) {
        var viewTemplate = $("#main-view").html();
        var trial = exp.trial_info.main_trials[CT];
        var filePath = trial.filepath || trial.filePath || "";
        var condition = trial.condition || "";
        var trialDescription = trial.description || "";
        $("#main").html(
            Mustache.render(viewTemplate, {
                image_path: filePath,
                trial_number: CT + 1,
                total_trials: this.trials,
                phase_title: "Step 1/3",
                instruction: "Step 1: Look at the image and enter the focal subject/object."
            })
        );

        window.scrollTo(0, 0);

        var phaseIndex = 1;
        var response = {
            entered_focal: "",
            selected_focal_sentences: [],
            selected_background_sentences: [],
            focal_description_na: false,
            background_description_na: false
        };
        var phaseStartTime = Date.now();
        var phaseTiming = {
            step_1_seconds: 0,
            step_2_seconds: 0,
            step_3_seconds: 0
        };

        var setPhaseUI = function(step) {
            phaseIndex = step;
            $("#error").text("Please complete this step before continuing.").hide();
            $("#phase-1-panel").toggle(step === 1);
            $("#phase-2-panel").toggle(step === 2);
            $("#phase-3-panel").toggle(step === 3);

            var phaseTitle = step === 1 ? "Step 1/3" : step === 2 ? "Step 2/3" : "Step 3/3";
            var instruction = "";
            if (step === 1) {
                instruction = "Step 1: Look at the image and enter the focal subject/object.";
            } else if (step === 2) {
                instruction = "Step 2: Highlight all the text spans that mention or describe the focal subject/object, or check N/A if none applies.";
            } else {
                instruction = "Step 3: Highlight all the text spans that mention or describe the background, or check N/A if none applies.";
            }

            $(".view .question").first().text("Trial " + (CT + 1) + " of " + main.trials + ": " + phaseTitle);
            $(".question-box .question").text(instruction);
        };

        var renderSelections = function(listSelector, selections) {
            var list = $(listSelector);
            list.empty();

            selections.forEach(function(sel, index) {
                var li = $("<li></li>");
                li.text(sel + " ");
                var removeBtn = $("<button type='button'>Remove</button>");
                removeBtn.on("click", function() {
                    selections.splice(index, 1);
                    renderSelections(listSelector, selections);
                });
                li.append(removeBtn);
                list.append(li);
            });
        };

        $("#description-block-focal").text(trialDescription || "(No description provided)");
        $("#description-block-background").text(trialDescription || "(No description provided)");

        $("#na-focal").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_focal_sentences.length = 0;
                renderSelections("#selection-list-focal", response.selected_focal_sentences);
            }
        });

        $("#na-background").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_background_sentences.length = 0;
                renderSelections("#selection-list-background", response.selected_background_sentences);
            }
        });

        $("#add-selection-focal").on("click", function() {
            if ($("#na-focal").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var selectedText = window.getSelection().toString().trim();
            if (!selectedText) {
                alert("Please highlight some text first.");
                return;
            }
            if (response.selected_focal_sentences.includes(selectedText)) {
                alert("That text is already in your focal selections.");
                return;
            }
            $("#na-focal").prop("checked", false);
            response.selected_focal_sentences.push(selectedText);
            renderSelections("#selection-list-focal", response.selected_focal_sentences);
        });

        $("#add-selection-background").on("click", function() {
            if ($("#na-background").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var selectedText = window.getSelection().toString().trim();
            if (!selectedText) {
                alert("Please highlight some text first.");
                return;
            }
            if (response.selected_background_sentences.includes(selectedText)) {
                alert("That text is already in your background selections.");
                return;
            }
            $("#na-background").prop("checked", false);
            response.selected_background_sentences.push(selectedText);
            renderSelections("#selection-list-background", response.selected_background_sentences);
        });

        setPhaseUI(1);

        $("#next").on("click", function() {
            var now = Date.now();

            if (phaseIndex === 1) {
                var focalInput = $("#focal_response").val().trim();
                if (!focalInput) {
                    $("#error").show();
                    return;
                }
                response.entered_focal = focalInput;
                phaseTiming.step_1_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(2);
                return;
            }

            if (phaseIndex === 2) {
                var focalNa = $("#na-focal").is(":checked");
                if (!focalNa && response.selected_focal_sentences.length === 0) {
                    $("#error").text("Add at least one highlighted span, or check N/A if the focal is not described.").show();
                    return;
                }
                response.focal_description_na = focalNa;
                phaseTiming.step_2_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(3);
                return;
            }

            var backgroundNa = $("#na-background").is(":checked");
            if (!backgroundNa && response.selected_background_sentences.length === 0) {
                $("#error").text("Add at least one highlighted span, or check N/A if the background is not described.").show();
                return;
            }
            response.background_description_na = backgroundNa;
            phaseTiming.step_3_seconds = (now - phaseStartTime) / 1000;

            exp.trial_data.push({
                trial_number: CT + 1,
                condition: condition,
                filepath: filePath,
                focal_label: trial.focal || "",
                background_label: trial.background || "",
                image_description: trialDescription,
                entered_focal: response.entered_focal,
                focal_description_na: response.focal_description_na,
                background_description_na: response.background_description_na,
                selected_focal_sentences: response.focal_description_na ? [] : response.selected_focal_sentences.slice(),
                selected_background_sentences: response.background_description_na ? [] : response.selected_background_sentences.slice(),
                step_1_seconds: phaseTiming.step_1_seconds,
                step_2_seconds: phaseTiming.step_2_seconds,
                step_3_seconds: phaseTiming.step_3_seconds
            });

            exp.findNextView();
        });
    },
    trials: 10
};

// Post-test page

var postTest = {
    name: "postTest",
    title: "Post-Survey Questions",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            var country = $('input[name=country]:checked').val();
            var nlangChecked = $('input[name=native_lang]:checked');
            var nlang = [];
            nlangChecked.each(function() {
                nlang.push($(this).val());
            });

            var countryOtherRequired = (country === 'other' && $('#country_other').val().trim() === '');
            var nlangOtherRequired = (nlang.includes('other') && $('#native_lang_other').val().trim() === '');

            if (!country || nlang.length === 0 || countryOtherRequired || nlangOtherRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            exp.global_data.country = country;
            exp.global_data.country_other = (country === 'other' ? $('#country_other').val().trim() : "");
            exp.global_data.native_lang = nlang;
            exp.global_data.native_lang_other = (nlang.includes('other') ? $('#native_lang_other').val().trim() : "");

            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            exp.findNextView();
        });
    },
    trials: 1
};

// Demographics & comments
var demographics = {
    name: "demographics",
    title: "Demographic Questions",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#demographics-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title
            })
        );

        $("#next").on("click", function(e) {
            e.preventDefault();

            // validation: check all required fields (except post_comments)
            var gender = $('input[name=gender]:checked').val();
            var age = $('#age').val();
            var yearsLived = $('#years_lived').val();
            var vision = $('input[name=vision]:checked').val();
            var country = $('input[name=country]:checked').val();
            var nlangChecked = $('input[name=native_lang]:checked');
            var nlang = [];
            nlangChecked.each(function() {
                nlang.push($(this).val());
            });
            
            // Check if "other" is selected, then the corresponding text field is required
            var visionOtherRequired = (vision === 'other' && $('#vision_other').val().trim() === '');
            var countryOtherRequired = (country === 'other' && $('#country_other').val().trim() === '');
            var nlangOtherRequired = (nlang.includes('other') && $('#native_lang_other').val().trim() === '');

            if (!gender || !age || !yearsLived || !vision || !country || nlang.length === 0 || 
                visionOtherRequired || countryOtherRequired || nlangOtherRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            // demographics
            exp.global_data.gender = gender;
            exp.global_data.age = age;
            exp.global_data.years_lived = yearsLived;
            exp.global_data.vision = vision;
            exp.global_data.vision_other = (vision === 'other' ? $('#vision_other').val().trim() : "");

            exp.global_data.country = country;
            exp.global_data.country_other = (country === 'other' ? $('#country_other').val().trim() : "");

            exp.global_data.native_lang = nlang;
            exp.global_data.native_lang_other = (nlang.includes('other') ? $('#native_lang_other').val().trim() : "");

            // comments (optional)
            exp.global_data.post_comments = $('#post_comments').val().trim();

            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // next
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "Thank you for taking part in this experiment!",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "Please press the button below to confirm that you completed the experiment with Prolific. Your completion code is C11UVM4K.<br />" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">Confirm</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};
