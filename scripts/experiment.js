// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    // specify view order
    this.views_seq = [
        informed_consent,
        intro,
        main,
        postTest,
        demographics,
        thanks
    ];
    const all_main_trials = imageListByGroup;

    // console.log("all_main_trials");
    // console.log(all_main_trials);
    
exp.customize = function() {
    const REQUIRED_TRIALS = 5;
      
        // all_main_trials should already be loaded from your csv/json
        // Each row should contain:
        // condition, filepath, focal, background, description
      
        // Step 1: make a clean copy and normalize field names
    let trial_pool = all_main_trials.map((trial, index) => ({
        trial_id: trial.trial_id || index + 1,
        condition: trial.condition,
        filepath: trial.filepath || trial.filePath,
        focal: String(trial.focal).trim().toLowerCase(),
        background: String(trial.background).trim().toLowerCase(),
        description: trial.description
    }));
      
    console.log("=== Randomization starting ===");
    console.log("Total rows in trial pool:", trial_pool.length);
      
        // Step 2: shuffle all rows
    trial_pool = _.shuffle(trial_pool);
      
        // Step 3: select trials with no repeated focals/backgrounds
    const selected_trials = [];
    const used_focals = [];
    const used_backgrounds = [];
    const rejected_trials = [];
      
    for (let i = 0; i < trial_pool.length; i++) {
        const candidate = trial_pool[i];
      
        const focal_used = used_focals.includes(candidate.focal);
        const background_used = used_backgrounds.includes(candidate.background);
      
        if (focal_used || background_used) {
        rejected_trials.push({
            trial_id: candidate.trial_id,
            condition: candidate.condition,
            filepath: candidate.filepath,
            focal: candidate.focal,
            background: candidate.background,
            reason: [
            focal_used ? `focal already used: ${candidate.focal}` : null,
            background_used ? `background already used: ${candidate.background}` : null
            ].filter(Boolean).join(" | ")
        });
            continue;
          }
      
          selected_trials.push(candidate);
          used_focals.push(candidate.focal);
          used_backgrounds.push(candidate.background);
      
          console.log("✓ Selected:", {
            trial_id: candidate.trial_id,
            condition: candidate.condition,
            focal: candidate.focal,
            background: candidate.background,
            filepath: candidate.filepath
          });
      
          if (selected_trials.length === REQUIRED_TRIALS) {
            break;
        };

        // If no image with unique focal AND background found, skip this group (NO REPEATS ALLOWED)
        if (!picked) {
            // Track this failure for summary
            selection_failures.push({
                groupKey: key,
                category: value.category,
                rejectedCandidates: all_candidates_rejected
            });
            
            console.warn("⚠️ SELECTION ALGORITHM FAILURE - No valid image found (skipping group to avoid repeats):", {
                groupKey: key,
                category: value.category,
                imageListByGroup: key,
                reason: "Could not find image with both unique focal and background - SKIPPING to prevent repeats",
                rejectedCandidates: all_candidates_rejected.length,
                details: all_candidates_rejected
            });
        }
    };
    
    // Validation: Verify NO repeated focals or backgrounds
    const final_focals = selected_trial_list.map(t => t.focal);
    const final_backgr = selected_trial_list.map(t => t.background);
    const duplicate_focals = final_focals.filter((focal, index) => final_focals.indexOf(focal) !== index);
    const duplicate_backgr = final_backgr.filter((back, index) => final_backgr.indexOf(back) !== index);
    
    if (duplicate_focals.length > 0 || duplicate_backgr.length > 0) {
        console.error("❌ VALIDATION FAILED - Found repeats in selection!");
        if (duplicate_focals.length > 0) {
            console.error("   Repeated focals:", duplicate_focals);
        }
        if (duplicate_backgr.length > 0) {
            console.error("   Repeated backgrounds:", duplicate_backgr);
        }
    } else {
        console.log("✓ Validation PASSED - No repeated focals or backgrounds");
    }
    
    const final_trial_list = _.shuffle(selected_trial_list).slice(0, 5);

    // Summary of selection results
    console.log("=== Image Selection Summary ===");
    console.log("Total images selected:", final_trial_list.length);
    console.log("Successful selections (unique focal + background):", final_trial_list.length);
    console.log("Selection failures (groups skipped):", selection_failures.length);
    if (selection_failures.length > 0) {
        console.warn("Groups that were skipped (no valid image without repeats):", selection_failures.map(f => ({
            groupKey: f.groupKey,
            category: f.category
        })));
    }
    console.log("Unique focals used:", final_focals);
    console.log("Unique backgrounds used:", final_backgr);

    // console.log("selected_trial_list");
    // console.log(selected_trial_list);
    // console.log(seen_focals);
    // console.log(seen_backgr);
  
  // Log to verify
    console.log("main_trials");
    console.log(final_trial_list);

    // main_trials = selected_main_trials.concat(attention_checks);
    main_trials = final_trial_list;
    this.trial_info.main_trials = main_trials;
    // ensure the main view runs exactly as many trials as we have images
    if (typeof main !== 'undefined' && Array.isArray(main_trials)) {
        main.trials = main_trials.length;
    }
    // console.log("main trials: ", this.trial_info.main_trials);

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ["main"];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
