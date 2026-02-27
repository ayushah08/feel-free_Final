package com.feelfree.backend.controller.FeelWall;


import com.feelfree.backend.dto.Achivement.AchievementDTO;
import com.feelfree.backend.dto.Achivement.AchievementResponseDTO;
import com.feelfree.backend.dto.FeelFree.CommentResponseDTO;
import com.feelfree.backend.dto.FeelFree.CreatePostRequest;
import com.feelfree.backend.dto.FeelFree.PostResponseDTO;
import com.feelfree.backend.entity.FeelWall.Post;
import com.feelfree.backend.entity.FeelWall.PostComment;
import com.feelfree.backend.entity.FeelWall.PostReaction;
import com.feelfree.backend.entity.FeelWall.ReactionType;
import com.feelfree.backend.entity.User;
import com.feelfree.backend.repository.FeelFree.PostCommentRepository;
import com.feelfree.backend.repository.FeelFree.PostReactionRepository;
import com.feelfree.backend.repository.FeelFree.PostRepository;
import com.feelfree.backend.repository.UserRepository;
import com.feelfree.backend.service.UserService;
import com.feelfree.backend.service.achivement.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;
    private final AchievementService achievementService;
    private final UserService userService;
    private final PostCommentRepository postCommentRepository;
    private final UserRepository userRepository;
    private final PostReactionRepository reactionRepository;

    @PostMapping
    public Post createPost(@RequestBody CreatePostRequest request) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUserName(username)
                .orElseThrow();

        Post post = Post.builder()
                .content(request.getContent())
                .anonymous(request.isAnonymous())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        postRepository.save(post);

        userService.updateStreak(user);
        userRepository.save(user);

        return post;
    }

    @GetMapping
    public List<PostResponseDTO> getAllPosts() {

        return postRepository.findAll()
                .stream()
                .map(post -> {

                    long relateCount =
                            reactionRepository.countByPostIdAndReactionType(
                                    post.getId(),
                                    ReactionType.RELATE
                            );

                    long calmCount =
                            reactionRepository.countByPostIdAndReactionType(
                                    post.getId(),
                                    ReactionType.CALM
                            );

                    long notAloneCount =
                            reactionRepository.countByPostIdAndReactionType(
                                    post.getId(),
                                    ReactionType.NOT_ALONE
                            );

                    return PostResponseDTO.builder()
                            .id(post.getId())
                            .content(post.getContent())
                            .anonymous(post.isAnonymous())
                            .author(post.isAnonymous()
                                    ? "Anonymous"
                                    : post.getUser().getUserName())
                            .relateCount(relateCount)
                            .calmCount(calmCount)
                            .notAloneCount(notAloneCount)
                            .createdAt(post.getCreatedAt())
                            .build();
                })
                .toList();
    }

    @PostMapping("/{postId}/react")
    public String reactToPost(@PathVariable Long postId,
                              @RequestParam ReactionType type) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUserName(username).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        if (reactionRepository.existsByPostIdAndUserId(postId, user.getId())) {
            return "Already reacted";
        }

        PostReaction reaction = PostReaction.builder()
                .post(post)
                .user(user)
                .reactionType(type)
                .build();

        reactionRepository.save(reaction);

        return "Reaction added";
    }


    @PostMapping("/{postId}/comment")
    public CommentResponseDTO addComment(
            @PathVariable Long postId,
            @RequestBody PostComment request) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUserName(username)
                .orElseThrow();

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        PostComment comment = PostComment.builder()
                .content(request.getContent())
                .anonymous(request.isAnonymous())
                .createdAt(LocalDateTime.now())
                .post(post)
                .user(user)
                .build();

        postCommentRepository.save(comment);

        return CommentResponseDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .anonymous(comment.isAnonymous())
                .author(comment.isAnonymous()
                        ? "Anonymous"
                        : user.getUserName())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    @GetMapping("/{postId}/comments")
    public List<CommentResponseDTO> getComments(@PathVariable Long postId) {

        return postCommentRepository.findByPostId(postId)
                .stream()
                .map(comment -> CommentResponseDTO.builder()
                        .id(comment.getId())
                        .content(comment.getContent())
                        .anonymous(comment.isAnonymous())
                        .author(comment.isAnonymous()
                                ? "Anonymous"
                                : comment.getUser().getUserName())
                        .createdAt(comment.getCreatedAt())
                        .build())
                .toList();
    }

    @GetMapping("/{userId}/achievements")
    public List<AchievementDTO> getAchievements(@PathVariable Long userId) {
        return achievementService.getAchievement(userId);
    }
}
