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
        "<p>Participation will take a total of about 5 minutes. You will be asked to view a few images and select parts of the image descriptions according to the instructions. Afterwards, you will also respond to a few brief post-survey questions.</p>" +
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
        "<p>Hi and welcome to the study!</p><br><p>In the following section, you will see <strong>5 photos</strong>, each paired with a description written by someone else. You will be asked to <strong>highlight parts of the description</strong> based on the instructions shown at each step. Please read the instructions carefully and highlight the text according to the instructions.</p><br><p>Afterward, you will answer two brief questions about where you live and what languages you speak.</p><br><p>When you are ready, please enter your Prolific ID below and then click the button to begin.</p>",
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
                instruction: "Step 1: Look at the image and then highlight in the text description what you consider to be the <strong>main subject/object</strong> of the image."
            })
        );

        window.scrollTo(0, 0);

        var phaseIndex = 1;
        var response = {
            selected_main_object_spans: [],
            selected_focal_sentences: [],
            selected_background_sentences: [],
            additional_focal_sentences: [],
            additional_background_sentences: [],
            main_object_description_na: false,
            focal_description_na: false,
            background_description_na: false,
            review_complete_checked: false
        };
        var highlightRanges = {
            step1: [],
            focal: [],
            background: [],
            reviewFocal: [],
            reviewBackground: []
        };
        var phaseStartTime = Date.now();
        var phaseTiming = {
            step_1_seconds: 0,
            step_2_seconds: 0,
            step_3_seconds: 0,
            step_4_seconds: 0
        };

        var setPhaseUI = function(step) {
            phaseIndex = step;
            $("#error").text("Please complete this step before continuing.").hide();
            $("#phase-1-panel").toggle(step === 1);
            $("#phase-2-panel").toggle(step === 2);
            $("#phase-3-panel").toggle(step === 3);
            $("#phase-4-panel").toggle(step === 4);

            var phaseTitle = step === 1 ? "Step 1/3" : step === 2 ? "Step 2/3" : step === 3 ? "Step 3/3" : "Review";
            var instruction = "";
            if (step === 1) {
                instruction = "Step 1: Look at the image and then highlight in the text description what you consider to be the <strong>main subject/object</strong> of the image.";
            } else if (step === 2) {
                instruction = "Step 2: Highlight <strong>all</strong> parts of the description that both mention and in any way describe the <strong>main subject/object</strong>.";
            } else if (step === 3) {
                instruction = "Highlight <strong>all</strong> parts of the description that either mention or in any way describe the <strong>background</strong> of the image (i.e., visual details that are <strong>not</strong> the main subject/object).";
            } else {
                instruction = "Review: Texts in black are ones you have not yet highlighted. Please highlight <strong>all</strong> texts mentioning and describing the <strong>main subject/object</strong> and the <strong>background</strong>.";
            }

            $(".view .question").first().text("Trial " + (CT + 1) + " of " + main.trials + ": " + phaseTitle);
            $(".question-box .question").html(instruction);

            if (step === 4) {
                renderReviewText();
            }
        };

        var escapeHtml = function(text) {
            return String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        var getSelectionRangeWithin = function(containerEl) {
            var selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) {
                return null;
            }
            var range = selection.getRangeAt(0);
            if (!containerEl.contains(range.commonAncestorContainer)) {
                return null;
            }
            var selectedText = selection.toString().trim();
            if (!selectedText) {
                return null;
            }
            var preRange = range.cloneRange();
            preRange.selectNodeContents(containerEl);
            preRange.setEnd(range.startContainer, range.startOffset);
            var start = preRange.toString().length;
            var end = start + range.toString().length;
            if (end <= start) {
                return null;
            }
            return {
                start: start,
                end: end,
                text: range.toString()
            };
        };

        var mergeRanges = function(ranges) {
            if (!ranges || ranges.length === 0) {
                return [];
            }
            var sorted = ranges.slice().sort(function(a, b) {
                return a.start - b.start;
            });
            var merged = [];
            sorted.forEach(function(r) {
                if (merged.length === 0) {
                    merged.push({ start: r.start, end: r.end });
                    return;
                }
                var prev = merged[merged.length - 1];
                if (r.start <= prev.end) {
                    prev.end = Math.max(prev.end, r.end);
                } else {
                    merged.push({ start: r.start, end: r.end });
                }
            });
            return merged;
        };

        var renderHighlightedText = function(containerSelector, descriptionText, ranges) {
            var container = $(containerSelector);
            var baseText = descriptionText || "(No description provided)";
            var merged = mergeRanges(ranges || []);
            if (merged.length === 0) {
                container.text(baseText);
                return;
            }
            var html = "";
            var cursor = 0;
            merged.forEach(function(r) {
                var safeStart = Math.max(0, Math.min(baseText.length, r.start));
                var safeEnd = Math.max(0, Math.min(baseText.length, r.end));
                if (safeStart > cursor) {
                    html += escapeHtml(baseText.slice(cursor, safeStart));
                }
                if (safeEnd > safeStart) {
                    html += "<mark class='description-highlight'>" + escapeHtml(baseText.slice(safeStart, safeEnd)) + "</mark>";
                }
                cursor = Math.max(cursor, safeEnd);
            });
            if (cursor < baseText.length) {
                html += escapeHtml(baseText.slice(cursor));
            }
            container.html(html);
        };

        var renderReviewText = function() {
            var container = $("#description-block-review");
            var baseText = trialDescription || "(No description provided)";
            var previousRanges = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
            );
            var reviewRanges = mergeRanges(
                highlightRanges.reviewFocal.concat(highlightRanges.reviewBackground)
            );

            // Render contiguous segments (not per-character) to preserve normal word spacing/kerning.
            var breakpoints = [0, baseText.length];
            previousRanges.forEach(function(r) {
                breakpoints.push(r.start, r.end);
            });
            reviewRanges.forEach(function(r) {
                breakpoints.push(r.start, r.end);
            });
            breakpoints = Array.from(new Set(breakpoints))
                .filter(function(n) {
                    return n >= 0 && n <= baseText.length;
                })
                .sort(function(a, b) {
                    return a - b;
                });

            var html = "";
            for (var i = 0; i < breakpoints.length - 1; i++) {
                var start = breakpoints[i];
                var end = breakpoints[i + 1];
                if (end <= start) {
                    continue;
                }
                var segment = escapeHtml(baseText.slice(start, end));
                var inReview = reviewRanges.some(function(r) {
                    return start >= r.start && start < r.end;
                });
                var inPrevious = previousRanges.some(function(r) {
                    return start >= r.start && start < r.end;
                });

                if (inReview) {
                    html += "<mark class='description-highlight'>" + segment + "</mark>";
                } else if (inPrevious) {
                    html += "<span class='review-previous-highlight'>" + segment + "</span>";
                } else {
                    html += "<span class='review-unhighlighted-text'>" + segment + "</span>";
                }
            }
            container.html(html || escapeHtml(baseText));
        };

        var renderSelections = function(listSelector, selections, ranges, blockSelector) {
            var list = $(listSelector);
            list.empty();

            selections.forEach(function(sel, index) {
                var li = $("<li></li>");
                li.text(sel + " ");
                var removeBtn = $("<button type='button'>Remove</button>");
                removeBtn.on("click", function() {
                    selections.splice(index, 1);
                    if (ranges) {
                        ranges.splice(index, 1);
                    }
                    renderSelections(listSelector, selections, ranges, blockSelector);
                    if (blockSelector) {
                        renderHighlightedText(blockSelector, trialDescription, ranges || []);
                    } else if (listSelector === "#selection-list-review-focal" || listSelector === "#selection-list-review-background") {
                        renderReviewText();
                    }
                });
                li.append(removeBtn);
                list.append(li);
            });
        };

        var hasUnhighlightedTextAfterFirstThreeSteps = function() {
            var baseText = trialDescription || "";
            if (!baseText) {
                return false;
            }
            var previousRanges = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
            );
            for (var i = 0; i < baseText.length; i++) {
                // Ignore whitespace and punctuation; only count letter/number characters
                // when deciding whether meaningful description text remains unhighlighted.
                if (!/[A-Za-z0-9]/.test(baseText.charAt(i))) {
                    continue;
                }
                var alreadyHighlighted = previousRanges.some(function(r) {
                    return i >= r.start && i < r.end;
                });
                if (!alreadyHighlighted) {
                    return true;
                }
            }
            return false;
        };

        var finalizeTrial = function(step4Skipped) {
            exp.trial_data.push({
                trial_number: CT + 1,
                condition: condition,
                filepath: filePath,
                focal_label: trial.focal || "",
                background_label: trial.background || "",
                image_description: trialDescription,
                main_object_description_na: response.main_object_description_na,
                selected_main_object_spans: response.main_object_description_na ? [] : response.selected_main_object_spans.slice(),
                focal_description_na: response.focal_description_na,
                background_description_na: response.background_description_na,
                selected_focal_sentences: response.focal_description_na ? [] : response.selected_focal_sentences.slice(),
                selected_background_sentences: response.background_description_na ? [] : response.selected_background_sentences.slice(),
                additional_focal_sentences: response.additional_focal_sentences.slice(),
                additional_background_sentences: response.additional_background_sentences.slice(),
                review_complete_checked: response.review_complete_checked,
                step_1_seconds: phaseTiming.step_1_seconds,
                step_2_seconds: phaseTiming.step_2_seconds,
                step_3_seconds: phaseTiming.step_3_seconds,
                step_4_seconds: phaseTiming.step_4_seconds,
                step_4_skipped: step4Skipped
            });

            exp.findNextView();
        };

        renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
        renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
        renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
        renderReviewText();

        $("#na-focal").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_focal_sentences.length = 0;
                highlightRanges.focal.length = 0;
                renderSelections("#selection-list-focal", response.selected_focal_sentences, highlightRanges.focal, "#description-block-focal");
                renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
            }
        });

        $("#na-step1").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_main_object_spans.length = 0;
                highlightRanges.step1.length = 0;
                renderSelections("#selection-list-step1", response.selected_main_object_spans, highlightRanges.step1, "#description-block-step1");
                renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
            }
        });

        $("#na-background").on("change", function() {
            if ($(this).is(":checked")) {
                response.selected_background_sentences.length = 0;
                highlightRanges.background.length = 0;
                renderSelections("#selection-list-background", response.selected_background_sentences, highlightRanges.background, "#description-block-background");
                renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
            }
        });

        $("#add-selection-step1").on("click", function() {
            if ($("#na-step1").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-step1")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("Please highlight text inside the description first.");
                return;
            }
            if (response.selected_main_object_spans.includes(selectionRange.text)) {
                alert("That text is already in your step 1 selections.");
                return;
            }
            $("#na-step1").prop("checked", false);
            response.selected_main_object_spans.push(selectionRange.text);
            highlightRanges.step1.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-step1", response.selected_main_object_spans, highlightRanges.step1, "#description-block-step1");
            renderHighlightedText("#description-block-step1", trialDescription, highlightRanges.step1);
            window.getSelection().removeAllRanges();
        });

        $("#add-selection-focal").on("click", function() {
            if ($("#na-focal").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-focal")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("Please highlight text inside the description first.");
                return;
            }
            var selectedText = selectionRange.text;
            if (response.selected_focal_sentences.includes(selectedText)) {
                alert("That text is already in your focal selections.");
                return;
            }
            $("#na-focal").prop("checked", false);
            response.selected_focal_sentences.push(selectedText);
            highlightRanges.focal.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-focal", response.selected_focal_sentences, highlightRanges.focal, "#description-block-focal");
            renderHighlightedText("#description-block-focal", trialDescription, highlightRanges.focal);
            window.getSelection().removeAllRanges();
        });

        $("#add-selection-background").on("click", function() {
            if ($("#na-background").is(":checked")) {
                alert("Uncheck N/A if you want to add highlighted text.");
                return;
            }
            var containerEl = $("#description-block-background")[0];
            var selectionRange = getSelectionRangeWithin(containerEl);
            if (!selectionRange) {
                alert("Please highlight text inside the description first.");
                return;
            }
            var selectedText = selectionRange.text;
            if (response.selected_background_sentences.includes(selectedText)) {
                alert("That text is already in your background selections.");
                return;
            }
            $("#na-background").prop("checked", false);
            response.selected_background_sentences.push(selectedText);
            highlightRanges.background.push({
                start: selectionRange.start,
                end: selectionRange.end
            });
            renderSelections("#selection-list-background", response.selected_background_sentences, highlightRanges.background, "#description-block-background");
            renderHighlightedText("#description-block-background", trialDescription, highlightRanges.background);
            window.getSelection().removeAllRanges();
        });

        $("#review-complete").on("change", function() {
            if ($(this).is(":checked")) {
                response.additional_focal_sentences.length = 0;
                response.additional_background_sentences.length = 0;
                highlightRanges.reviewFocal.length = 0;
                highlightRanges.reviewBackground.length = 0;
                renderSelections("#selection-list-review-focal", response.additional_focal_sentences, highlightRanges.reviewFocal, null);
                renderSelections("#selection-list-review-background", response.additional_background_sentences, highlightRanges.reviewBackground, null);
                renderReviewText();
            }
        });

        var addReviewSelection = function(type) {
            var selectionRange = getSelectionRangeWithin($("#description-block-review")[0]);
            if (!selectionRange) {
                alert("Please highlight text inside the review description first.");
                return;
            }
            var overlapExists = mergeRanges(
                highlightRanges.step1
                    .concat(highlightRanges.focal)
                    .concat(highlightRanges.background)
                    .concat(highlightRanges.reviewFocal)
                    .concat(highlightRanges.reviewBackground)
            ).some(function(r) {
                return selectionRange.start < r.end && selectionRange.end > r.start;
            });
            if (overlapExists) {
                alert("Please select only black text that has not been highlighted before.");
                return;
            }

            $("#review-complete").prop("checked", false);
            var selectedText = selectionRange.text;
            if (type === "focal") {
                if (response.additional_focal_sentences.includes(selectedText)) {
                    alert("That text is already in additional main object-related selections.");
                    return;
                }
                response.additional_focal_sentences.push(selectedText);
                highlightRanges.reviewFocal.push({ start: selectionRange.start, end: selectionRange.end });
                renderSelections("#selection-list-review-focal", response.additional_focal_sentences, highlightRanges.reviewFocal, null);
            } else {
                if (response.additional_background_sentences.includes(selectedText)) {
                    alert("That text is already in additional background-related selections.");
                    return;
                }
                response.additional_background_sentences.push(selectedText);
                highlightRanges.reviewBackground.push({ start: selectionRange.start, end: selectionRange.end });
                renderSelections("#selection-list-review-background", response.additional_background_sentences, highlightRanges.reviewBackground, null);
            }
            renderReviewText();
            window.getSelection().removeAllRanges();
        };

        $("#add-review-focal").on("click", function() {
            addReviewSelection("focal");
        });

        $("#add-review-background").on("click", function() {
            addReviewSelection("background");
        });

        setPhaseUI(1);

        $("#next").on("click", function() {
            var now = Date.now();

            if (phaseIndex === 1) {
                var step1Na = $("#na-step1").is(":checked");
                if (!step1Na && response.selected_main_object_spans.length === 0) {
                    $("#error").text("Highlight at least one text span that identifies the main subject/object, or check N/A if none applies.").show();
                    $("#error").show();
                    return;
                }
                response.main_object_description_na = step1Na;
                phaseTiming.step_1_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(2);
                return;
            }

            if (phaseIndex === 2) {
                var focalNa = $("#na-focal").is(":checked");
                if (!focalNa && response.selected_focal_sentences.length === 0) {
                    $("#error").text("Please highlight texts which describe the main subject/object, or check the box if none applies.").show();
                    return;
                }
                response.focal_description_na = focalNa;
                phaseTiming.step_2_seconds = (now - phaseStartTime) / 1000;
                phaseStartTime = Date.now();
                setPhaseUI(3);
                return;
            }

            if (phaseIndex === 3) {
                var backgroundNa = $("#na-background").is(":checked");
                if (!backgroundNa && response.selected_background_sentences.length === 0) {
                    $("#error").text("Please highlight texts which describe the background, or check the box if none applies.").show();
                    return;
                }
                response.background_description_na = backgroundNa;
                phaseTiming.step_3_seconds = (now - phaseStartTime) / 1000;
                if (!hasUnhighlightedTextAfterFirstThreeSteps()) {
                    response.review_complete_checked = true;
                    phaseTiming.step_4_seconds = 0;
                    finalizeTrial(true);
                    return;
                }
                phaseStartTime = Date.now();
                setPhaseUI(4);
                return;
            }

            if (phaseIndex === 4) {
                var reviewComplete = $("#review-complete").is(":checked");
                var hasAdditionalSelections =
                    response.additional_focal_sentences.length > 0 ||
                    response.additional_background_sentences.length > 0;
                if (!reviewComplete && !hasAdditionalSelections) {
                    $("#error").text("You have not select anything yet, or check that remaining text is neither main object-related nor background-related.").show();
                    return;
                }
                response.review_complete_checked = reviewComplete;
                phaseTiming.step_4_seconds = (now - phaseStartTime) / 1000;
                finalizeTrial(false);
            }
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
