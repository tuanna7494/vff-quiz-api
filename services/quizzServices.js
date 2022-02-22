const db = require("../models");


module.exports = {

    // TODO: Create modal Results -> Answer -> Question -> Quizz
    createQuizzByUserId: async function(body, userId) {
        const results = body.results;
        let questions = body.questions;
        let listResultAnswers = questions.flatMap(question => question.answers);

        // CREATE RESULTS
        const resultsInserted = await db.Result.insertMany(results);
        const listInseredResultId = resultsInserted.map(result => result._id);

        // CREATE ANSWERS
        const listAnswersInsert = listResultAnswers.map(answer => {
            if (answer.result_idx > listInseredResultId.length) {
                throw new Error("Answer result_idx is out of range");
            }

            return {
                title: answer.title,
                type: answer.type,
                thumbnail: answer.thumbnail || "",
                result: listInseredResultId[answer.result_idx]
            }
        });
        
        const listAnswersInserted = await db.Answer.insertMany(listAnswersInsert);
        const listInseredAnswerId = listAnswersInserted.map(answer => answer._id);
        
        // CREATE QUESTIONS
        let sliceIndex = 0;
        const listQuestionsInsert = questions.map((question, index) => {
            const equivalentAnswers = listAnswersInserted.slice(sliceIndex, sliceIndex + question.answers.length);
            sliceIndex += question.answers.length;
            
            return {
                title: question.title,
                color_bg_hex: question.color_bg_hex,
                color_text_hex: question.color_text_hex,
                answers: equivalentAnswers
            }
        })

        const listQuestionsInserted = await db.Question.insertMany(listQuestionsInsert);
        const listInseredQuestionId = listQuestionsInserted.map(question => question._id);
        const nextSlugId = await this.getNextSequence(body.slug);
        const finalSlug = `${body.slug}${nextSlugId}`;
        
        // CREATE QUIZZ
        const quizzInsert = {
            title: body.title,
            description: body.description,
            thumbnail: body.thumbnail,
            slug: finalSlug,
            enabled: body.enabled,
            data_ads_client: body.data_ads_client,
            data_ads_slot: body.data_ads_slot,
            questions: listInseredQuestionId,
            results: listInseredResultId,
            user: userId
        }

        const quizzInserted = await db.Quizz.create(quizzInsert);
        return quizzInserted;
    },

    generateQuizzQuery: async function(body, userId) {
        const results = body.results;
        let questions = body.questions;
        let listResultAnswers = questions.flatMap(question => question.answers);

        // CREATE RESULTS
        const resultsInserted = await db.Result.insertMany(results);
        const listInseredResultId = resultsInserted.map(result => result._id);

        // CREATE ANSWERS
        const listAnswersInsert = listResultAnswers.map(answer => {
            if (answer.result_idx > listInseredResultId.length) {
                throw new Error("Answer result_idx is out of range");
            }

            return {
                title: answer.title,
                type: answer.type,
                thumbnail: answer.thumbnail || "",
                result: listInseredResultId[answer.result_idx]
            }
        });
        
        const listAnswersInserted = await db.Answer.insertMany(listAnswersInsert);
        const listInseredAnswerId = listAnswersInserted.map(answer => answer._id);
        
        // CREATE QUESTIONS
        let sliceIndex = 0;
        const listQuestionsInsert = questions.map((question, index) => {
            const equivalentAnswers = listAnswersInserted.slice(sliceIndex, sliceIndex + question.answers.length);
            sliceIndex += question.answers.length;
            
            return {
                title: question.title,
                color_bg_hex: question.color_bg_hex,
                color_text_hex: question.color_text_hex,
                answers: equivalentAnswers
            }
        })

        const listQuestionsInserted = await db.Question.insertMany(listQuestionsInsert);
        const listInseredQuestionId = listQuestionsInserted.map(question => question._id);
        const nextSlugId = await this.getNextSequence(body.slug);
        const finalSlug = `${body.slug}${nextSlugId}`;

        // CREATE QUIZZ
        const quizzInsert = {
            title: body.title,
            slug: finalSlug,
            description: body.description,
            thumbnail: body.thumbnail,
            enabled: body.enabled,
            data_ads_client: body.data_ads_client,
            data_ads_slot: body.data_ads_slot,
            questions: listInseredQuestionId,
            results: listInseredResultId,
            user: userId
        }

        return quizzInsert
    },
    
    getQuizzes: function(query) {
        return  new Promise(function(resolve, reject) {
            db.Quizz.find(query).populate('questions').populate('results').populate("user", "first_name last_name avata").select("-sequence")
            .exec(function (err, quizzes) {
                if  (err) {
                    reject(err);
                    return
                }
                db.Answer.populate(quizzes, "questions.answers", function(error, result) {
                    if  (err) {
                        reject(err);
                        return
                    } else {
                        resolve(result);
                    }
                })
            })
        }) 
    },

    /*
    *  TODO: Delete all answers, questions, results of a quizz
    *   @param {Object} quizzId
    */
    bulkDeleteChildByQuizzId: async function(quizzId) {
        const quizzes =  await this.getQuizzes({
            _id: quizzId
        });
        
        if (quizzes.length > 0) {
            const quizz = quizzes[0];
            const listAnswerId = quizz.questions.flatMap(questions => questions.answers).map(answer => answer._id);
            const listQuestionId = quizz.questions.map(question => question._id);
            const listResultId = quizz.results.map(result => result._id);
            
            await db.Answer.deleteMany({_id: {$in: listAnswerId}});
            await db.Question.deleteMany({_id: {$in: listQuestionId}});
            await db.Result.deleteMany({_id: {$in: listResultId}});
            // await db.Quizz.deleteOne({_id: quizzId}); 

            return true
        } else {
             throw new Error("Quizz not found");
        }   
    },

    updateQuizzById: async function(quizzId, body, userId) {
        const quizzes =  await this.getQuizzes({
            _id: quizzId
        });
        
        if (quizzes.length > 0) {
            const quizz = quizzes[0];
            const wasDeleted = await this.bulkDeleteChildByQuizzId(quizz._id);
            if (wasDeleted) {
                const quizzInserted = await this.generateQuizzQuery(body, userId);
                const updatedQuizz = await db.Quizz.updateOne({_id: quizzId}, quizzInserted, {new: true}); 
                return updatedQuizz;
            }
        } else {
             throw new Error("Quizz not found");
        }   
    },

    deleteQuizzById: async function(quizzId) {
        return db.Quizz.deleteOne({_id: quizzId});
    },

    getNextSequence: async function(slug) {
        const seq = await  db.Quizz.updateMany({slug: slug}, {$inc: {sequence: 1}}, {new: true});
        const maxSequence  = await db.Quizz.findOne({slug: slug}, {sequence: 1, _id: 0}).limit(1);
        
        if (maxSequence) {
            return Number.parseInt(maxSequence.sequence);
        } else {
            return ''
        }
    },

    getResultBySlug: async function(slug, resultId) {
        const quizzBySlug = await this.getQuizzes({
            slug: slug
        });
        const guessResult = await db.Share.findById(resultId).populate("result quizz");
        const quizz = quizzBySlug[0];

        if (!guessResult) {
            throw new Error("Result not found");
        } 

        if (!quizz) {
            throw new Error("Quizz not found");
        }

        return Object.assign(quizz._doc, {
            guest_result: {
                relate_id: resultId,
                ...guessResult._doc.result._doc
            },
        });

    },

    saveShareResult: async function(body) {
        const shareResult = await db.Share.create(body);

        return shareResult;
    }
}