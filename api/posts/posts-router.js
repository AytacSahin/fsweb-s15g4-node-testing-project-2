// 🟢 posts için gerekli routerları buraya yazın

const router = require("express").Router()
const postsModel = require("./posts-model");

// 🟢 GET ALL DATA / tüm dataları alıyoruz:

router.get("/", async (req, res) => {
    try {
        const all = await postsModel.find();
        res.json(all);
    } catch (error) {
        res.status(500).json({ message: "Gönderiler alınamadı" });
    }
});

// 🟢 GET DATA WITH AN ID / uniq id'li datayı dönüyoruz: 

router.get("/:id", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
    }
});

// 🟢 POST DATA WITH AN ID : 

router.post("/", async (req, res) => {
    try {
        let { title, contents } = req.body;
        if (!title || !contents) {
            res.status(400).json({ message: "Lütfen gönderi için bir title ve contents sağlayın" });
        } else {
            const inserted = await postsModel.insert({ title, contents });
            const insertedPost = await postsModel.findById(inserted.id);
            res.status(201).json(insertedPost);
        }
    } catch (error) {
        res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
});

// 🟢 UPDATE DATA WITH AN ID : 

router.put("/:id", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else {
            let { title, contents } = req.body;
            if (!title || !contents) {
                res.status(400).json({ message: "Lütfen gönderi için bir title ve contents sağlayın" });
            } else {
                await postsModel.update(req.params.id, { title, contents });
                const updatedPost = await postsModel.findById(req.params.id);
                res.json(updatedPost);
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
    }
});

// 🟢 DELETE DATA WITH AN ID / uniq id'li datayı siliyoruz: 

router.delete("/:id", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else {
            await postsModel.remove(req.params.id);
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi silinemedi" });
    }
});

// 🟢 DELETE DATA WITH AN ID / uniq id'li datayı siliyoruz: 

router.delete("/:id/comments", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else {
            await postsModel.remove(req.params.id);
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi silinemedi" });
    }
});

// 🟢 GET DATA WITH A COMMENT /ilgili comment'teki data: 

router.get("/:id/comments", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else {
            const comments = await postsModel.findPostComments(req.params.id);
            res.json(comments);
        }
    } catch (error) {
        res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
    }
});

// 🟢 router'ı dışarı çıkarıyoruz
module.exports = router;